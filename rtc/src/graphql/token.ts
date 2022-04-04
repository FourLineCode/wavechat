import jwt from "jsonwebtoken";

export function generateInternalToken(): string {
  const token = jwt.sign({}, process.env.INTERNAL_SECRET!);

  return token;
}
