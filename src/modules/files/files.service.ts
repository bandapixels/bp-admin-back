import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, In, Repository } from 'typeorm';
import { Files } from './entity/files.entity';
import { CreateFileDto } from './dto/createFile.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files) private fileRepository: Repository<Files>,
  ) {}

  public async createFile(file: CreateFileDto): Promise<Files> {
    return this.fileRepository.save(file);
  }

  public async findFile(
    id: number,
    type?: 'IMAGE' | 'PREVIEW',
  ): Promise<Files> {
    const findOpts: FindOneOptions<Files> = {
      where: {
        id,
      },
    };

    if (type) {
      findOpts.where = {
        ...(findOpts.where as FindConditions<Files>),
        type,
      };
    }

    return this.fileRepository.findOne(findOpts);
  }

  public async findFiles(ids?: number[]): Promise<Files[]> {
    const findOpts: FindConditions<Files> = {};

    if (ids.length) {
      findOpts.id = In(ids);
    }

    return this.fileRepository.find(findOpts);
  }
}
