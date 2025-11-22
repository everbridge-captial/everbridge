import { ApiProperty } from '@nestjs/swagger';
import { CommentVisibility } from '../entities';

export class CommentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  entityType: string;

  @ApiProperty()
  entityId: string;

  @ApiProperty({ enum: CommentVisibility })
  visibility: CommentVisibility;

  @ApiProperty()
  content: string;

  @ApiProperty({ required: false })
  metadata?: object;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false })
  createdBy?: string;
}
