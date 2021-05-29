import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Tweet } from "./Tweet";
import { User } from "./User";

@ObjectType()
@Entity()
export class Like extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: number;

  @Field()
  @PrimaryColumn()
  tweetId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Tweet, (tweet) => tweet.likedBy)
  tweet: Tweet;
}
