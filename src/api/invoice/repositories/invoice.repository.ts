import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, FilterQuery, Model, Models } from 'mongoose';
import { Invoice, InvoiceConstant } from "../schemas/invoice-schema";
import { CreateInvoiceDto } from "../dtos/create-invoice.dto";
import { DateFilterDto } from "../dtos/date-filter.dto";

@Injectable()
export class InvoiceRepository{
    public  constructor(@InjectModel(Invoice.name) private readonly invoiceModel:Model<Invoice>){
        // this.invoiceModel=mongoConnection.model(InvoiceConstant)
    }

    // private invoiceModel:Model<Invoice>

    public  async createInvoice(createInvoiceDto:CreateInvoiceDto):Promise<Invoice>
    {
        console.log(createInvoiceDto)
        const invoiceInstance=await this.invoiceModel.create({
            amount:createInvoiceDto.amount,
            customer:createInvoiceDto.customer,
            items:createInvoiceDto.items
        })

        return await invoiceInstance.save()
    }

    public async findOneById(id: string): Promise<Invoice | null> {
        return this.invoiceModel.findById(id).exec();
    }

    public async listByDateRange(filter?: DateFilterDto): Promise<Invoice[]> {
        const mongoFilter: FilterQuery<Invoice> = {};

        if (filter) {
            if (filter.startDate || filter.endDate) {
                mongoFilter.date = {};
                if (filter.startDate) mongoFilter.date.$gte = filter.startDate;
                if (filter.endDate) mongoFilter.date.$lte = filter.endDate;
            }
        }

        return this.invoiceModel.find(mongoFilter)
            .sort({ date: -1 }) 
            .exec();
    }
}