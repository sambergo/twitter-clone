import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Tweet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  UserId!: number;

  @Field()
  @Column()
  follows!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
