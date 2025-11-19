import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UploaderService } from './uploader.service';

@ApiTags('Uploader')
@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}
}
