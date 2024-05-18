import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export type TokenPayload = {
  id: number,
  role: string,
};

export default class JwtUtils {
  static sign(payload: TokenPayload): string {
    return jwt.sign(payload, secret);
  }

  static verify(token: string): TokenPayload {
    return jwt.verify(token, secret) as TokenPayload;
  }
}
