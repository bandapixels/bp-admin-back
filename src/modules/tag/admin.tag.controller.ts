import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';

import AdminTagService from './admin.tag.service';
import { Role } from '../../common/constants/role';
import { Roles } from '../auth/decorators/roles.decorator';
import { TagDto } from './dto/tag.dto';
import { RolesGuard } from '../auth/guards/jwt-auth.roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Tag } from './entity/admin.tag.entity';

@Controller('admin/tags')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminTagController {
  constructor(private readonly adminTagService: AdminTagService) {}

  @Get('/:id')
  public async findOneTag(@Param('id') id: string): Promise<Tag> {
    const tag = await this.adminTagService.getTagsById(id);

    if (!tag) {
      throw new NotFoundException();
    }

    return tag;
  }

  @Post('/')
  public async createTag(@Body() newTag: TagDto, @Res() res: Response) {
    await this.adminTagService.createTag(newTag);
    return res.status(200).end();
  }

  @Patch('/edit/:id')
  public async editTag(@Body() tag: TagDto, @Res() res, @Param('id') tagId) {
    await this.adminTagService.updateTag(tag, tagId);
    res.redirect('/admin/tags');
  }

  @Delete('/delete/:id')
  public async deleteTag(@Param('id') tagId, @Res() res) {
    await this.adminTagService.delete(tagId);
    res.redirect('/admin/tags');
  }
}
