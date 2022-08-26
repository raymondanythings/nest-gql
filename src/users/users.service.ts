import { JwtService } from './../jwt/jwt.service';
import { LoginInput } from './dtos/login.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { User } from './entities/user.entity';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already.' };
      }
      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );
      return { ok: true };
    } catch (err) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({ email, password }: LoginInput) {
    try {
      const loginUser = await this.users.findOne({
        where: { email },
        select: ['id', 'password'],
      });
      if (!loginUser) {
        return { ok: false, error: "User doesn't exist" };
      }
      const passwordCorrect = await loginUser.checkPassword(password);
      if (!passwordCorrect) {
        return { ok: false, error: "Password doesn't correct" };
      }

      const token = this.jwtService.sign(loginUser.id + '');

      return { ok: true, token };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findById(id: number) {
    try {
      const user = await this.users.findOne({ where: { id } });
      if (user) {
        return {
          ok: true,
          user,
        };
      }
      throw new Error();
    } catch (error) {
      return { ok: false, error: 'User Not Found.' };
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne({ where: { id: userId } });
      if (email) {
        const exist = await this.users.findOne({ where: { email } });
        if (exist) {
          return {
            ok: false,
            error: 'This email is already exist.',
          };
        }
        user.email = email;
      }
      if (password) {
        user.password = password;
      }
      await this.users.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: 'Could not update Profile.' };
    }
  }
}
