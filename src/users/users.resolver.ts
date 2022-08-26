import { UsersService } from './users.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Mutation(returns => CreateAccountOutput)
  async createAccount(@Args('input') createAccountInput: CreateAccountInput) {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation(returns => LoginOutput)
  async login(@Args('input') loginInput: LoginInput) {
    return this.usersService.login(loginInput);
  }
}
