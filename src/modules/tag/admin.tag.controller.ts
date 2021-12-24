import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  NotFoundException,
  Query,
  HttpCode,
} from '@nestjs/common';

import AdminTagService from './admin.tag.service';
import { Tag } from './entity/admin.tag.entity';
import { Role } from '../../common/constants/role';
import { Roles } from '../auth/decorators/roles.decorator';
import { TagDto } from './dto/tag.dto';
import { RolesGuard } from '../auth/guards/jwt-auth.roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetTagsListQueryDto } from './dto/getTagsListQuery.dto';

@Controller('admin/tags')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminTagController {
  constructor(private readonly adminTagService: AdminTagService) {}

  @Get('/')
  public async getTags(@Query() query: GetTagsListQueryDto): Promise<Tag[]> {
    return this.adminTagService.getTags(query.skip, query.take);
  }

  @Get('/:id')
  public async findOneTag(@Param('id') id: string): Promise<Tag> {
    const tag = await this.adminTagService.getTagsById(id);

    if (!tag) {
      throw new NotFoundException();
    }

    return tag;
  }

  @Post('/')
  public async createTag(@Body() newTag: TagDto) {
    return this.adminTagService.createTag(newTag);
  }

  @HttpCode(204)
  @Patch('/:id')
  public async editTag(@Body() tag: TagDto, @Param('id') tagId) {
    return this.adminTagService.updateTag(tag, tagId);
  }

  @HttpCode(204)
  @Delete('/:id')
  public async deleteTag(@Param('id') tagId) {
    return this.adminTagService.delete(tagId);
  }
}
