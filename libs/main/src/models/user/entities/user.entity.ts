import * as bcrypt from 'bcrypt';
import { Entity, Column, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SALT_OR_ROUND } from '../../../common/constants/app.constant';
import { AppEntity } from '../../../common/entities/app-entity.abstract';

@Entity()
export class User extends AppEntity {
  @Column({ unique: true })
  @ApiProperty()
  public email: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  public emailVerificationOtp: string;

  @Exclude()
  @Column({
    type: 'bigint',
    nullable: true,
  })
  public emailVerificationValidTo: number;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  @ApiProperty()
  public emailVerifiedAt: number;

  @Column()
  @ApiProperty()
  public name: string;

  @Exclude()
  @Column({ nullable: true })
  public password: string;

  @Column({ length: 5, nullable: true })
  @ApiProperty()
  public phoneCode: string;

  @Column({
    length: 20,
    nullable: true,
  })
  @ApiProperty()
  public phoneNumber: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  public phoneVerificationOtp: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  public phoneVerificationValidTo: Date;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  public phoneVerifiedAt: Date;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  public profilePic: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  public resetPasswordOtp: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  public resetPasswordToken: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  public resetPasswordTokenValidTo: Date;

  @Exclude()
  @Column({ nullable: true })
  public resetPasswordValidTo: Date;

  /**
   * Relations
   */

  /**
   * Hooks
   */
  @BeforeInsert()
  public async hashPasswordOnCreate() {
    if (this.password) {
      const saltOrRounds = SALT_OR_ROUND;
      const hash = await bcrypt.hash(this.password, saltOrRounds);
      this.password = hash;
    }
  }

  @BeforeInsert()
  public setPhoneCode() {
    /**
     * Set default phone code to +62
     */
    this.phoneCode = this.phoneCode ? this.phoneCode : '+62';
  }
}
