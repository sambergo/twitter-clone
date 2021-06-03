import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Like } from "./Like";
import { Tweet } from "./Tweet";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column()
  fullname!: string;

  @Field()
  @Column()
  dateOfBirth!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => [Tweet])
  @OneToMany(() => Tweet, (tweet) => tweet.creator)
  tweets: Tweet[];

  // @Field(() => [Follow])
  // @OneToMany(() => Follow, (follow) => follow.followedBy)
  // followedBy: User[];

  // @OneToMany(() => Follow, (follow) => follow.follows)
  // follows: Follow[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
