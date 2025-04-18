import { Injectable } from "@nestjs/common";
import { InvoiceRepository } from "../repositories/invoice.repository";
import { Invoice } from "../schemas/invoice-schema";
import { CreateInvoiceDto } from "../dtos/create-invoice.dto";
import { DateFilterDto } from "../dtos/date-filter.dto";

@Injectable()
export class InvoiceService{
    public constructor(private readonly invoiceRepository:InvoiceRepository){}

       public  async createInvoice(createInvoiceDto:CreateInvoiceDto):Promise<Invoice>
        {
            return await this.invoiceRepository.createInvoice(createInvoiceDto)
        }
    
        public async findOneById(id: string): Promise<Invoice | null> {
            return this.invoiceRepository.findOneById(id)
        }
    
        public async listByDateRange(filter: DateFilterDto): Promise<Invoice[]> {
            return await this.invoiceRepository.listByDateRange(filter)
        }
}