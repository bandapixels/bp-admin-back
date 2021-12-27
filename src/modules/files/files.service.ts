import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entity/file.entity';
import { CreateFileDto } from './dto/createFile.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  public async createFile(file: CreateFileDto): Promise<File> {
    return this.fileRepository.save(file);
  }

  public async findFile(id: number): Promise<File> {
    return this.fileRepository.findOne(id);
  }

  public async findFiles(): Promise<File[]> {
    return this.fileRepository.find();
  }
}
