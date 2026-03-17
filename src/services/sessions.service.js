import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/carts.repository.js";
import PasswordResetDAO from "../dao/mongo/passwordReset.dao.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { sendMail } from "../utils/mailer.js";
import crypto from "crypto";

const userRepo = new UserRepository();
const cartRepo = new CartRepository();
const passwordResetDAO = new PasswordResetDAO();

export default class SessionsService {

  async register(userData) {
    if (!userData.password) throw new Error("Password requerida");

    userData.password = createHash(userData.password);

    const cart = await cartRepo.createCart({ products: [] });

    userData.cart = cart._id;

    const newUser = await userRepo.createUser(userData);

    return {
      status: "success",
      message: "Usuario registrado",
      user: userRepo.toDTO(newUser),
    };
  }

  async login({ email, password }) {
    if (!email || !password) throw new Error("Email y password son requeridos");

    const user = await userRepo.getUserByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const valid = isValidPassword(user, password);
    if (!valid) throw new Error("Password incorrecto");

    const token = generateToken(user);

    return {
      status: "success",
      token,
      user: userRepo.toDTO(user),
    };
  }

  async getCurrentUser(user) {
    if (!user) throw new Error("Usuario no autenticado");

    return userRepo.toDTO(user);
  }

  async forgotPassword(email) {
    if (!email) throw new Error("Email requerido");

    const user = await userRepo.getUserByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const token = crypto.randomBytes(20).toString("hex");

    await passwordResetDAO.create({
      email,
      token,
      expires: Date.now() + 3600000,
    });

    const link = `http://localhost:8080/reset-password/${token}`;

    try {
      await sendMail(
        email,
        "Recuperar contraseña",
        `<a href="${link}">Restablecer contraseña</a>`
      );
    } catch (err) {
      throw new Error("Error enviando correo: " + err.message);
    }

    return { message: "Correo enviado" };
  }

  async resetPassword(token, newPassword) {
    if (!token || !newPassword)
      throw new Error("Token y nueva contraseña requeridos");

    const reset = await passwordResetDAO.readOne({ token });
    if (!reset) throw new Error("Token inválido");
    if (reset.expires < Date.now()) throw new Error("Token expirado");

    const user = await userRepo.getUserByEmail(reset.email);
    if (!user) throw new Error("Usuario no encontrado");

    if (isValidPassword(user, newPassword)) {
      throw new Error("No puedes usar la misma contraseña");
    }

    user.password = createHash(newPassword);
    await userRepo.update(user._id, user);

    await passwordResetDAO.delete(reset._id);

    return { message: "Contraseña actualizada" };
  }
}