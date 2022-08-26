import { Secret } from 'jsonwebtoken';

export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';

export interface JwtModuleOptions {
  priveKey?: Secret;
}
