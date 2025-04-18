import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Invoice, InvoiceConstant, InvoiceSchema } from "./schemas/invoice-schema";
import { InvoiceController } from "./controllers/invoice.controller";
import { InvoiceService } from "./services/invoice-service";
import { InvoiceRepository } from "./repositories/invoice.repository";

@Module({
    imports:[MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }])],
    controllers:[InvoiceController],
    providers:[InvoiceService,InvoiceRepository]
})
export class InvoiceModule{}