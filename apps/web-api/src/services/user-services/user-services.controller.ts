import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Query,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ApiPaginatedResponse,
  ApiBaseResponse,
  CustomBaseResponseInterceptor,
  DetailOptionDto,
  ListOptionDto,
  CreateUserDto,
  User,
  UserService,
  SUCCESS_MSG,
} from '@app/main';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user-services')
@ApiTags('User Services')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor, CustomBaseResponseInterceptor)
export class UserServicesController {
  constructor(public service: UserService) {}

  @Get()
  @ApiPaginatedResponse(User)
  async getAll(@Query() listOptionDto: ListOptionDto) {
    const result = await this.service.findAll(listOptionDto);
    return { message: SUCCESS_MSG, result };
  }

  @Get(':id')
  @ApiBaseResponse(User)
  async getOne(@Param() param: DetailOptionDto) {
    const result = await this.service.findById(param.id);
    return { message: SUCCESS_MSG, result };
  }

  @Post()
  @ApiBaseResponse(User)
  async create(@Body() body: CreateUserDto, @Req() req) {
    const result = await this.service.create(body, req);
    return { message: SUCCESS_MSG, result };
  }

  @Put(':id')
  @ApiBaseResponse(User)
  async update(
    @Param() param: DetailOptionDto,
    @Body() body: CreateUserDto,
    @Req() req,
  ) {
    const result = await this.service.update(param.id, body, req);
    return { message: SUCCESS_MSG, result };
  }

  @Delete(':id')
  @ApiBaseResponse(User)
  async delete(@Param() param: DetailOptionDto, @Req() req) {
    const result = await this.service.delete(param.id, req);
    return { message: SUCCESS_MSG, result };
  }

  @Patch(':id/restore')
  @ApiBaseResponse(User)
  async restore(@Param() param: DetailOptionDto, @Req() req) {
    const result = await this.service.restore(param.id, req);
    return { message: SUCCESS_MSG, result };
  }
}
