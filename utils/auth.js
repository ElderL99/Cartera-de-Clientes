import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { userId, email, iat, exp }
  } catch (error) {
    return null;
  }
}
