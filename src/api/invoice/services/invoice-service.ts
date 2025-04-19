import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InvoiceRepository } from "../repositories/invoice.repository";
import { Invoice } from "../schemas/invoice-schema";
import { CreateInvoiceDto } from "../dtos/create-invoice.dto";
import { DateFilterDto } from "../dtos/date-filter.dto";
import { RabbitMQService } from "src/utility/rabbit/services/rabbit.service";
import { RabbitQueueEnum } from "src/utility/rabbit/enums/rabbit-queue.enum";
import { IDailyReport } from "../interfaces/daily-report.interface";

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  constructor(private readonly invoiceRepository: InvoiceRepository,
    private readonly rabbitService:RabbitMQService
  ) {}

  public async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return await this.invoiceRepository.createInvoice(createInvoiceDto);
  }

  public async findOneById(id: string): Promise<Invoice | null> {
    return this.invoiceRepository.findOneById(id);
  }

  public async listByDateRange(filter: DateFilterDto): Promise<Invoice[]> {
    return await this.invoiceRepository.listByDateRange(filter);
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON) 
  async generateDailySalesReport() {
    this.logger.log('Generating daily sales report...');
    
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 1); 

    const invoices = await this.listByDateRange({
      startDate,
      endDate: now
    });

    const report:IDailyReport = {
      date: now,
      totalInvoices: invoices.length,
      totalSales: invoices.reduce((sum, invoice) => sum + invoice.amount, 0),
      itemsSold: this.calculateItemsSold(invoices),
      startDate,
      endDate: now
    };

    await this.rabbitService.publishMessage(
        RabbitQueueEnum.DAILY_SALES_REPORT,
        report
      );

    this.logger.log('Daily Sales Report:', report);
    return report;
  }

  private calculateItemsSold(invoices: Invoice[]): Record<string, number> {
    const itemsSummary: Record<string, number> = {};

    invoices.forEach(invoice => {
      invoice.items.forEach(item => {
        itemsSummary[item.sku] = (itemsSummary[item.sku] || 0) + item.qt;
      });
    });

    return itemsSummary;
  }
}