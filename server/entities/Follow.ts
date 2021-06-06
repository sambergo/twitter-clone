import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Follow extends BaseEntity {
  @Field()
  @PrimaryColumn()
  followerId: number;

  @Field()
  @PrimaryColumn()
  followsId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.followers, { nullable: true })
  follower: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.following, { nullable: true })
  follows: User;
}
