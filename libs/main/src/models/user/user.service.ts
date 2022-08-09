import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  ListOptionDto,
  PaginateDto,
  PageMetaDto,
  getSortColumns,
} from '../../common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async create(payload: CreateUserDto, req: any): Promise<User> {
    try {
      const model = new User();
      this.repository.merge(model, payload);

      return await this.repository.save(model, {
        data: { action: 'CREATE', user: req.user },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async update(id: string, payload: any, req: any): Promise<User> {
    try {
      const model = new User();
      this.repository.merge(model, { id }, payload);

      return await this.repository.save(model, {
        data: { action: 'UPDATE', user: req.user },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async delete(id: string, req: any): Promise<User> {
    try {
      const item = await this.findById(id);
      const deletedAt = Math.floor(Date.now() / 1000);

      const model = new User();
      this.repository.merge(model, item, { deletedAt });

      return await this.repository.save(model, {
        data: { action: 'DELETE', user: req.user },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async restore(id: string, req: any): Promise<User> {
    try {
      const item = await this.findById(id);

      const model = new User();
      this.repository.merge(model, item, { deletedAt: null });

      return await this.repository.save(model, {
        data: { action: 'RESTORE', user: req.user },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(filter: ListOptionDto): Promise<PaginateDto<User>> {
    try {
      const query = this.repository.createQueryBuilder('user');

      if (filter.isDeleted) {
        query.andWhere('deleted_at IS NOT NULL');
      } else {
        query.andWhere('deleted_at IS NULL');
      }

      if (filter.search) {
        query.andWhere('name ILIKE :search OR email ILIKE :search', {
          search: `%${filter.search}%`,
        });
      }

      if (filter.sort) {
        const orderBy = getSortColumns(filter.sort);
        query.orderBy(orderBy);
      }

      if (!filter.disablePaginate) {
        query.take(filter.limit);
        query.skip(filter.skip);
      }

      const [data, totalData] = await query.getManyAndCount();
      const total = data.length;

      const meta = new PageMetaDto({
        totalData,
        total,
        page: filter.offset,
        size: filter.disablePaginate ? totalData : filter.limit,
      });

      return new PaginateDto(data, meta);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.repository.findOneBy({
        id,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
