// src/invoice/dtos/date-filter.dto.ts
import { IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class DateFilterDto {
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  endDate?: Date;
}