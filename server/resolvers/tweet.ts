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
import { Like } from "../entities/Like";
import { Tweet } from "../entities/Tweet";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

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
  @UseMiddleware(isAuth)
  async allTweets(): // @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
  // @Ctx() { req }: MyContext
  Promise<InfiniteTweets> {
    const tweets = await getConnection().manager.find(Tweet, {
      relations: ["creator", "likedBy"],
    });
    return {
      hasMore: true,
      tweets,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async like(
    @Arg("tweetId", () => Int) tweetId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Like.insert({
      userId: req.session.userId,
      tweetId,
    });
    return true;
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
    @Ctx() { req }: MyContext
  ): Promise<Tweet> {
    return await Tweet.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }
}
