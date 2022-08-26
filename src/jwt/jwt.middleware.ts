import { JwtService } from 'src/jwt/jwt.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      try {
        const id = this.jwtService.verify(token.toString());

        if (+id && typeof id === 'string') {
          try {
            const { user, ok } = await this.usersService.findById(+id);
            if (ok) {
              req['user'] = user;
            }
          } catch (e) {}
        }
      } catch {
        return res.status(401).json({
          ok: false,
          message: 'Invalid Signature',
        });
      }
    }
    next();
  }
}
