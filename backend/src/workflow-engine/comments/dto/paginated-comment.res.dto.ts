import { PaginationRes } from '@common/base';
import { CommentResponseDto } from './comment.res.dto';

export class PaginatedCommentResponseDto extends PaginationRes<CommentResponseDto> {}
