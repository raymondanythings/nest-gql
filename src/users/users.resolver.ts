import { UsersService } from './users.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
}
