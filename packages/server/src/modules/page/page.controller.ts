import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Post,
  Delete,
  Patch,
  Param,
  Query,
  Body,
  UseGuards
} from '@nestjs/common';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  /**
   * 创建页面
   * @param page
   */
  @Post()
  create(@Body() page) {
    return this.pageService.create(page);
  }

  /**
   * 获取所有文章
   */
  @Get()
  findAll(@Query() queryParams) {
    return this.pageService.findAll(queryParams);
  }

  /**
   * 获取指定页面
   * @param id
   */
  @Get(':id')
  findById(@Param('id') id) {
    return this.pageService.findById(id);
  }

  /**
   * 更新页面
   * @param id
   * @param page
   */
  @Patch(':id')
  updateById(@Param('id') id, @Body() page) {
    return this.pageService.updateById(id, page);
  }

  /**
   * 文章访问量 +1
   */
  @Post(':id/views')
  @HttpCode(HttpStatus.OK)
  updateViewsById(@Param('id') id) {
    return this.pageService.updateViewsById(id);
  }

  /**
   * 删除文章
   * @param id
   */
  @Delete(':id')
  deleteById(@Param('id') id) {
    return this.pageService.deleteById(id);
  }
}
