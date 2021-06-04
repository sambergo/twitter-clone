import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME } from "./constants";
import { Follow } from "./entities/Follow";
import { Like } from "./entities/Like";
import { Tweet } from "./entities/Tweet";
import { User } from "./entities/User";
import { LikeResolver } from "./resolvers/like";
import { TweetResolver } from "./resolvers/tweet";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";

const CORS_ORIGIN = "http://localhost:3000";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "twitter",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [User, Tweet, Like, Follow],
  });

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 WEEK
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      },
      saveUninitialized: false,
      secret: "salainen",
      resave: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [UserResolver, TweetResolver, LikeResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });
  server.applyMiddleware({ app, cors: false });

  // TODO PORT
  app.listen({ port: 4000 }, () =>
    console.log("Now browse to http://localhost:4000" + server.graphqlPath)
  );
};

main().catch((er) => console.error(er));
