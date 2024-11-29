import * as jwt from "jsonwebtoken";

interface IJwtData {
  uid: number;
  role: string;
}

// Ele gera o tokem
const sign = (data: IJwtData) => {
  if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const verify = (tokem: string) => {
  if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";

  try {
    const decoded = jwt.verify(tokem, process.env.JWT_SECRET);

    if (typeof decoded === "string") {
      return "INVALID_TOKEN";
    }
    return decoded as IJwtData;
  } catch (error) {
    return "INVALID_TOKEN";
  }
};

export const JWTService = {
  sign,
  verify,
};
