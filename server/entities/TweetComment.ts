import { Field, Int, ObjectType, Root } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Like } from "./Like";
import { Tweet } from "./Tweet";
import { User } from "./User";

@ObjectType()
@Entity()
export class TweetComment extends BaseEntity {
  @Field()
  @Column()
  targetId: number;

  @Field(() => Tweet)
  @ManyToOne(() => Tweet, (tweet) => tweet.comments)
  targetTweet: Tweet;

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  tweet!: string;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.tweets)
  creator: User;

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.tweet)
  likedBy: Like[];

  @Field(() => [TweetComment])
  @OneToMany(() => TweetComment, (comment) => comment.targetTweet)
  comments: TweetComment[];

  @Field(() => Int)
  likes(@Root() parent: TweetComment): number {
    return parent.likedBy?.length || 0;
  }

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
