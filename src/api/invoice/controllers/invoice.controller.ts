import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { InvoiceService } from "../services/invoice-service";
import { CreateInvoiceDto } from "../dtos/create-invoice.dto";
import { DateFilterDto } from "../dtos/date-filter.dto";
import { Invoice } from "../schemas/invoice-schema";

@Controller("invoices")
export class InvoiceController {
    public constructor(private readonly invoiceService: InvoiceService) { }

    @Post()
    public async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
        return await this.invoiceService.createInvoice(createInvoiceDto)
    }
    
    @Get()
    public async listByDateRange(@Query("filter") filter: DateFilterDto): Promise<Invoice[]> {
        return await this.invoiceService.listByDateRange(filter)
    }

    @Get(":id")
    public async findOneById(@Param("id") id: string): Promise<Invoice | null> {
        return this.invoiceService.findOneById(id)
    }

}