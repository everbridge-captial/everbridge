import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities';
import { CommentService } from './comments.service';
import { CommentRepository } from './comments.repository';
import { CommentsController } from './comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentsModule {}
