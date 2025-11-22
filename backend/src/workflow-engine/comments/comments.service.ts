import { Injectable } from '@nestjs/common';
import { Comment } from './entities';
import { CommentRepository } from './comments.repository';
import { BaseService } from '@common/base';

@Injectable()
export class CommentService extends BaseService<Comment> {
  constructor(private commentRepository: CommentRepository) {
    super(commentRepository, Comment);
  }
}
