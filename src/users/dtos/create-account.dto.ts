import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { PickType as MPickType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/podcast/dtos/output.dto';

import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
