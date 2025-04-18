import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Invoice, InvoiceConstant, InvoiceSchema } from "./schemas/invoice-schema";
import { InvoiceController } from "./controllers/invoice.controller";
import { InvoiceService } from "./services/invoice-service";
import { InvoiceRepository } from "./repositories/invoice.repository";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports:[MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),ScheduleModule.forRoot()],
    controllers:[InvoiceController],
    providers:[InvoiceService,InvoiceRepository]
})
export class InvoiceModule{}