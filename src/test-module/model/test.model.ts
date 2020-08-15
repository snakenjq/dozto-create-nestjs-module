import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Test {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
}
