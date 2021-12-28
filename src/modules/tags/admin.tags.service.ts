import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TagDto } from './dto/tag.dto';
import { Tags } from './entity/admin.tags.entity';

@Injectable()
export default class AdminTagsService {
  constructor(
    @InjectRepository(Tags)
    private adminTagRepository: Repository<Tags>,
  ) {}

  async getTags(skipNum: number, takeNum: number) {
    return this.adminTagRepository.find({
      select: ['id', 'name'],
      skip: skipNum,
      take: takeNum,
    });
  }

  async getAllTags() {
    return this.adminTagRepository.find();
  }

  async getTagsById(id) {
    return this.adminTagRepository.findOne(id, {
      select: ['id', 'name'],
    });
  }

  async getTagsByIds(ids) {
    return this.adminTagRepository.findByIds(ids);
  }

  async createTag(newTag: TagDto) {
    const tag = await this.adminTagRepository.create(newTag);
    return this.adminTagRepository.save(tag);
  }

  async updateTag(editTag: TagDto, tagId: number) {
    return this.adminTagRepository.update(tagId, editTag);
  }

  async delete(tagId: number) {
    return this.adminTagRepository.delete(tagId);
  }
}
