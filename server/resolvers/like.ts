import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Like } from "../entities/Like";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@Resolver(Like)
export class LikeResolver {
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
  async unlike(
    @Arg("tweetId", () => Int) tweetId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Like.delete({ tweetId, userId: req.session.userId });
    return true;
  }
}
