// base.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class AppEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  /*
   * Create, Update and Delete Date Columns
   */

  @CreateDateColumn()
  public createdAt: Date;

  @Column({ nullable: true })
  @Exclude()
  public createdBy: string;

  @Column({ type: 'uuid', nullable: true })
  @Exclude()
  public createdById: string;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ nullable: true })
  @Exclude()
  public updatedBy: string;

  @Column({ type: 'uuid', nullable: true })
  @Exclude()
  public updatedById: string;

  @DeleteDateColumn()
  @Exclude()
  public deletedAt: number;

  @Column({ nullable: true })
  @Exclude()
  public deletedBy: string;

  @Column({ type: 'uuid', nullable: true })
  @Exclude()
  public deletedById: string;

  @VersionColumn()
  @Exclude()
  public version: number;
}
