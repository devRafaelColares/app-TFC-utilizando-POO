import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export type TokenPayload = {
  id: number,
  email: string,
};

export default class JwtUtils {
  static sign(payload: TokenPayload): string {
    const { id, email } = payload;
    return jwt.sign({ id, email }, secret);
  }

  static verify(token: string): TokenPayload {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    const { id, email } = decoded;
    return { id, email };
  }
}
