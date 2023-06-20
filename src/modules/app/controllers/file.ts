import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';

import { FileRepository } from '../repositories/file';
import { PathValidator } from '../validators/file/path';

@ApiTags('App: Files')
@Controller('/files')
@AuthRequired()
export class FileController {
  constructor(private fileRepository: FileRepository) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileRepository.upload(file);
  }

  @Post('path')
  public async getPath(@Body() body: PathValidator) {
    return this.fileRepository.getPath(body.filename);
  }
}
