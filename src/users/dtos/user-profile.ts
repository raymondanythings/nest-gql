import { User } from './../entities/user.entity';
import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/podcast/dtos/output.dto';

@ArgsType()
export class UserProfileInput {
  @Field(type => Number)
  userId: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field(type => User, { nullable: true })
  user?: User;
}
