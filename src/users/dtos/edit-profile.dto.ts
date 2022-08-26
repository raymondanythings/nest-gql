import { ObjectType, PickType, PartialType, InputType } from '@nestjs/graphql';
import { CoreOutput } from 'src/podcast/dtos/output.dto';

import { User } from '../entities/user.entity';
@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}
