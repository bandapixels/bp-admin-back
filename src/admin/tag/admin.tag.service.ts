import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';
import { Tag } from './entity/admin.tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class AdminTagService {
  constructor(
    @InjectRepository(Tag)
    private adminTagRepository: Repository<Tag>,
  ) {}

  async getTags(skipNum, takeNum) {
    return this.adminTagRepository.find({
      skip: skipNum,
      take: takeNum,
    });
  }

  async getTagsById(id) {
    return this.adminTagRepository.findOne(id);
  }

  async createTag(newTag: TagDto) {
    const tag = await this.adminTagRepository.create(newTag);
    return this.adminTagRepository.save(tag);
  }

  async updateTag(editTag: TagDto, tagId) {
    return this.adminTagRepository.update(tagId, editTag);
  }

  async delete(tagId) {
    return this.adminTagRepository.delete(tagId);
  }
}
