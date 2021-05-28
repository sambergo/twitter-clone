import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Tweet } from "../entities/Tweet";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

// @Field()
// @PrimaryGeneratedColumn()
// id!: number;
// @Field()
// @Column()
// tweet!: string;
// //   @Field()
// //   @Column()
// //   text!: string;
// @Field(() => Int, { nullable: true })
// voteStatus: number | null;
// @Field()
// @Column({ type: "int", default: 0 })
// points!: number;
// @Field()
// @Column()
// creatorId: number;
// @Field()
// @ManyToOne(() => User, (user) => user.tweets)
// creator: User;
// @OneToMany(() => Like, (like) => like.tweet)
// likes: Like[];
// @Field(() => String)
// @CreateDateColumn()
// createdAt: Date;
// @Field(() => String)
// @UpdateDateColumn()
// updatedAt: Date;

@InputType()
class TweetInput {
  @Field()
  tweet: string;
}

@ObjectType()
class InfiniteTweets {
  @Field(() => [Tweet])
  tweets: Tweet[];
  @Field()
  hasMore: boolean;
}

@Resolver(Tweet)
export class TweetResolver {
  @Query(() => InfiniteTweets)

  // async userTweets(
  //   @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
  //   @Ctx() { req }: MyContext
  // ): Promise<InfiniteTweets> {
  //   const tweets = await getConnection().manager.find(Tweet);
  //   return {
  //     hasMore: true,
  //     tweets,
  //   };
  // }
  @Query(() => InfiniteTweets)
  @UseMiddleware(isAuth)
  async allTweets(
    // @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<InfiniteTweets> {
    const tweets = await getConnection().manager.find(Tweet);
    console.log(req);
    return {
      hasMore: true,
      tweets,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTweet(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Tweet.delete({ id, creatorId: req.session.userId });
    return true;
  }

  @Mutation(() => Tweet)
  @UseMiddleware(isAuth)
  async editTweet(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: TweetInput,
    @Ctx() { req }: MyContext
  ): Promise<Tweet | null> {
    let tweet = await Tweet.findOne({
      id,
      creatorId: req.session.userId,
    });
    if (tweet) {
      tweet.tweet = input.tweet;
      tweet.save();
    }
    return tweet ?? null;
  }

  @Mutation(() => Tweet)
  @UseMiddleware(isAuth)
  async createTweet(
    @Arg("input") input: TweetInput,
    // @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Tweet> {
    return await Tweet.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }
}
