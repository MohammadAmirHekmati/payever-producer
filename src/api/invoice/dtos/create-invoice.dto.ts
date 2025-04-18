import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { InvoiceItem } from "../classes/invoice-item.class";

export class CreateInvoiceDto{
    @IsNotEmpty()
    @IsString()
    public customer :string

    @IsNotEmpty()
    @IsNumber()
    public amount :number

    @IsArray()
    @IsNotEmpty()
    public items:InvoiceItem[]
}