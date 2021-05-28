import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Tweet } from "./Tweet";
import { User } from "./User";

@Entity()
export class Like extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Tweet, (tweet) => tweet.likes, {
    onDelete: "CASCADE",
  })
  tweet: Tweet;
}
