import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import AdminTagService from './admin.tag.service';
import { TagDto } from './dto/tag.dto';

@Controller('admin/tags')
export class AdminTagController {
  constructor(private readonly adminTagService: AdminTagService) {}

  @Get('/')
  @Render('layouts/app.ejs')
  public async getAllTags(@Param('skip') skip = 0, @Param('take') take = 30) {
    const tags = await this.adminTagService.getTags(skip, take);
    return { tags, body: '../admin/tag/index.ejs', guest: false };
  }

  @Get('/create')
  @Render('layouts/app.ejs')
  public async creatingTag() {
    return { body: '../admin/tag/create.ejs', guest: false };
  }

  @Post('/create')
  public async createTag(@Body() newTag: TagDto, @Res() res) {
    await this.adminTagService.createTag(newTag);
    res.redirect('/admin/tags');
  }

  @Get('/:id/edit')
  @Render('layouts/app.ejs')
  public async editingTag(@Param('id') tagId) {
    const tag = await this.adminTagService.getTagsById(tagId);
    return { tag, body: '../admin/tag/edit.ejs', guest: false };
  }

  @Post('/:id/edit')
  public async editTag(@Body() tag: TagDto, @Res() res, @Param('id') tagId) {
    await this.adminTagService.updateTag(tag, tagId);
    res.redirect('/admin/tags');
  }

  @Post('/delete/:id')
  public async deleteTag(@Param('id') tagId, @Res() res) {
    await this.adminTagService.delete(tagId);
    res.redirect('/admin/tags');
  }
}
