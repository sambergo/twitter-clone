import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Follow extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: number;

  @Field()
  @PrimaryColumn()
  followsId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.follows)
  follows: User;

  // @Field(() => User)
  // @ManyToOne(() => User, (user) => user.followedBy)
  // followedBy: User;

  // @ManyToOne(() => Tweet, (user) => user.followedBy)
  // followedBy: Tweet;
}
