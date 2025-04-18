
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { InvoiceItem } from '../classes/invoice-item.class';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice {
  @Prop({required:true})
  customer : string;

  @Prop({required:true})
  amount : number;

  @Prop({required:true,type:String, default:`OR${Math.floor(new Date().getTime() / 1000)}`})
  reference : string;

  @Prop({required:true,type:Date , default:new Date()})
  date  : string;

  @Prop([InvoiceItem])
  items:InvoiceItem[]
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
export const InvoiceConstant="Invoice"
