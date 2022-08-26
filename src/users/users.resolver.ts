import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { UsersService } from './users.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Mutation(returns => CreateAccountOutput)
  createAccount(@Args('input') createAccountInput: CreateAccountInput) {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation(returns => LoginOutput)
  login(@Args('input') loginInput: LoginInput) {
    return this.usersService.login(loginInput);
  }

  @UseGuards(AuthGuard)
  @Query(returns => UserProfileOutput)
  userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.usersService.findById(userProfileInput.userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => EditProfileOutput)
  async editProfile(
    @AuthUser() user: User,
    @Args('input') editProfileInput: EditProfileInput,
  ) {
    return this.usersService.editProfile(user.id, editProfileInput);
  }
}
