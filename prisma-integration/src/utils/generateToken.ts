import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN) || 840000;
export default function generateToken(userId: number) {
  return jwt.sign({ id: userId }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
}
