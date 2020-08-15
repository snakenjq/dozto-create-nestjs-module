import { PartialType, InputType } from "@nestjs/graphql";
import { CreateTestInput } from ".";

@InputType()
export class UpdateTestInput extends PartialType(CreateTestInput) {}
