import { Request, Response } from "express";
import session from "express-session";
import { Redis } from "ioredis";
import { InputType, Field } from "type-graphql";

export type MyContext = {
  req: Request & { session: session.Session & { userId?: number } };
  redis: Redis;
  res: Response;
};

@InputType()
export class LoginInput {
  @Field()
  usernameOrEmail: string;
  @Field()
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  fullname: string;
  @Field()
  password: string;
  @Field()
  dateOfBirth: string;
}
