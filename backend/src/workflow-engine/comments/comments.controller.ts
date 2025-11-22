import { Controller, Inject } from '@nestjs/common';
import { BaseController } from '@common/base/base.controller';
import { Comment } from './entities';
import { CommentService } from './comments.service';

@Controller('comments')
export class CommentsController extends BaseController<Comment> {
  constructor(
    @Inject(CommentService)
    private readonly commentService: CommentService,
  ) {
    super(commentService);
  }
}
