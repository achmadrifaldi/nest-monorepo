import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class ListOptionDto {
  @ApiPropertyOptional()
  @IsOptional()
  public search: string;

  @ApiPropertyOptional({
    minimum: 0,
    maximum: 1,
    default: 0,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(1)
  @IsOptional()
  public isDeleted?: number = 0;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  public limit?: number = 10;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  public offset?: number = 1;

  @ApiPropertyOptional({
    default: 'created_at|ASC',
  })
  public sort?: string = 'created_at|ASC';

  @ApiPropertyOptional({
    default: false,
  })
  @Type(() => Boolean)
  public disablePaginate?: boolean = false;

  get skip(): number {
    return (this.offset - 1) * this.limit;
  }
}
