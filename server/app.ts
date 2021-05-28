import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Like } from "./entities/Like";
import { Tweet } from "./entities/Tweet";
import { User } from "./entities/User";
import { TweetResolver } from "./resolvers/tweet";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "twitter",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [User, Tweet, Like],
  });

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
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
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "salainen",
      resave: false,
    })
  );

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, TweetResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });
  server.applyMiddleware({ app });

  // TODO PORT
  app.listen({ port: 4000 }, () =>
    console.log("Now browse to http://localhost:4000" + server.graphqlPath)
  );
};

main().catch((er) => console.error(er));
