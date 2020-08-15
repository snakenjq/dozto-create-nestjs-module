import { Resolver } from "@nestjs/graphql";

import { TestService } from "../service";

@Resolver()
export class TestResolver {
  constructor(private readonly testService: TestService) {}
}
