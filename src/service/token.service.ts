import { Injectable } from '@nestjs/common';
import { sign, SignOptions, verify } from 'jsonwebtoken';

@Injectable()
export class TokenService {
  private readonly _authTokenSecret: string = 'test';
  private readonly _authTokenAlg: SignOptions = {
    algorithm: 'HS512',
  };

  generate(payload: AuthTokenPayload) {
    return sign(payload, this._authTokenSecret, this._authTokenAlg);
  }

  verify(token: string) {
    return verify(
      token,
      this._authTokenSecret,
      this._authTokenAlg,
    ) as AuthTokenPayload;
  }
}

type AuthTokenPayload = {
  userId: number;
};
