import { Module } from "@nestjs/common";
import { ConfigurationModule } from "src/config/configuration.module";
import { RabbitMQService } from "./services/rabbit.service";

@Module({
    imports:[ConfigurationModule],
    providers:[RabbitMQService],
    exports:[RabbitMQService]
})
export class RabbitModule{

}