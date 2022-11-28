import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { PaginationParams } from 'src/utils/paginationParams';
import HarshUpdatePostDto from './dto/harshUpdatePost.dto';
import ParamsWithId from './dto/id.param';
import PostDto from './dto/post.dto';
import SoftUpdatePostDto from './dto/softUpdatePost.dto copy';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(
    @Query() { skip, limit, startId }: PaginationParams,
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.postsService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  async getPost(@Param() { id }: ParamsWithId) {
    return this.postsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: PostDto, @Req() req: RequestWithUser) {
    return this.postsService.create(post, req.user);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: ParamsWithId) {
    return this.postsService.delete(id);
  }

  @Put(':id')
  async harshUpdatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: HarshUpdatePostDto,
  ) {
    return this.postsService.update(id, post);
  }

  @Patch(':id')
  async updatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: SoftUpdatePostDto,
  ) {
    return this.postsService.update(id, post, true);
  }
}
