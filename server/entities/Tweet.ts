import { Ctx, Field, Int, ObjectType, Root } from "type-graphql";
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
import { MyContext } from "types";
import { Like } from "./Like";
import { User } from "./User";

@ObjectType()
@Entity()
export class Tweet extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  tweet!: string;

  @Field()
  @Column()
  creatorId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tweets)
  creator!: User;

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.tweet)
  likedBy: Like[];

  @Field()
  @Column({ default: false })
  isComment!: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  targetId: number;

  @Field(() => Tweet, { nullable: true })
  @ManyToOne(() => Tweet, (tweet) => tweet.comments)
  targetTweet: Tweet;

  @Field(() => [Tweet], { nullable: true })
  @OneToMany(() => Tweet, (tweet) => tweet.targetTweet)
  comments: Tweet[];

  // TODO: fiskumpi tapa?
  @Field(() => Boolean)
  likedByUser(@Root() parent: Tweet, @Ctx() { req }: MyContext): boolean {
    return parent.likedBy
      .map((l) => l.userId)
      .includes(req.session.userId ?? -1);
  }

  @Field(() => Int)
  commentsCount(@Root() parent: Tweet): number {
    return parent.comments?.length || 0;
  }

  @Field(() => Int)
  likesCount(@Root() parent: Tweet): number {
    return parent.likedBy?.length || 0;
  }

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
