import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  TestController,
  TestResolver,
  TestService,
  Test,
} from ".";

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  providers: [TestService, TestResolver],
  controllers: [TestController],
})
export class TestModule {}
