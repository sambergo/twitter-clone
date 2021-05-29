import { ObjectType, Field } from "type-graphql";
import { Entity, Column, ManyToOne } from "typeorm";
import { Tweet } from "./Tweet";

@ObjectType()
@Entity()
export class TweetComment extends Tweet {
  @Field()
  @Column()
  targetId: number;

  @ManyToOne(() => Tweet, (tweet) => tweet.comments)
  targetTweet: Tweet;
}
