export interface IDailyReport{
        date: Date
        totalInvoices: number
        totalSales:number
        itemsSold: Record<string,number>
        startDate:Date
        endDate: Date
}