import { Controller } from "@nestjs/common";

import { TestService } from "../service";

@Controller("test")
export class TestController {
  constructor(private readonly testService: TestService) {}
}
