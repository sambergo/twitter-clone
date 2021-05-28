import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
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
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // @Field()
  // @Column({ default: [] })
  // following: User[];

  // @OneToMany(() => User, (user) => user.following)
  // follower: User[]

  @OneToMany(() => Tweet, (tweet) => tweet.creator)
  tweets: Tweet[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
