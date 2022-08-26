import * as jwt from 'jsonwebtoken';
import { Inject } from '@nestjs/common';
import { CONFIG_OPTIONS, JwtModuleOptions } from './jwt.interface';

export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign<T>(payload: string) {
    return jwt.sign(payload, this.options.priveKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.priveKey);
  }
}
