import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import AdminTagService from './admin.tag.service';
import { TagDto } from './dto/tag.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/Models/role.enum';

@Controller('admin/tags')
@Roles(Role.ADMIN)
export class AdminTagController {
  constructor(private readonly adminTagService: AdminTagService) {}

  @Get('/')
  @Render('layouts/app.ejs')
  public async getAllTags(@Query('skip') skip = 0, @Query('take') take = 30) {
    const tags = await this.adminTagService.getTags(skip, take);
    return { tags, body: '../admin/tag/index.ejs', isAuthorized: true };
  }

  @Get('/create')
  @Render('layouts/app.ejs')
  public async creatingTag() {
    return { body: '../admin/tag/create.ejs', isAuthorized: true };
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
    return { tag, body: '../admin/tag/edit.ejs', isAuthorized: true };
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
