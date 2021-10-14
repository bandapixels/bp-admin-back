import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Res,
  UploadedFiles,
  UseInterceptors,
  UsePipes
} from "@nestjs/common";
import AdminPostService from "./admin.post.service";
import { PostDto } from "./dto/post.dto";
import AdminTagService from "../tag/admin.tag.service";
import { JoiValidationPipe } from "../../filter/joi.validation.pipe";
import { CreatePostSchema } from "./schema/create.post.schema";

@Controller("admin/posts")
export class AdminPostController {
  constructor(
    private readonly adminPostService: AdminPostService,
    private readonly adminTagService: AdminTagService
  ) {
  }

  @Get("/")
  @Render("layouts/app.ejs")
  public async getPosts(@Query("skip") skip = 0, @Query("take") take = 30) {
    const posts = await this.adminPostService.getAllPosts(skip, take);
    return { posts, body: "../admin/post/index.ejs", guest: false };
  }

  @Get("/create")
  @Render("layouts/app.ejs")
  public async creatingPost() {
    const tags = await this.adminTagService.getAllTags();
    return { tags, body: "../admin/post/create.ejs", guest: false };
  }

  @Post("/create")
  @UsePipes(new JoiValidationPipe(CreatePostSchema))
  public async createPost(
    @Body() newPost: PostDto,
    @Res() res
  ) {
    await this.adminPostService.createPost(newPost);
    res.redirect("/admin/posts");
  }
}
