import { Module } from "@nestjs/common";
import { ConfigurationModule } from "src/config/configuration.module";

@Module({
    imports:[ConfigurationModule]
})
export class RabbitModule{

}