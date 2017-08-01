import { META, Base, theme, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import { CommentProps } from './Comment';
import CommentActions from './CommentActions';
import CommentAuthor from './CommentAuthor';
import CommentAvatar from './CommentAvatar';
import CommentMeta from './CommentMeta';
import CommentText from './CommentText';
import * as CSS from './styles/comment.min.css';
@theme(CSS)
/**
 * A comment can contain content.
 */
export default class CommentContent extends Base<CommentProps> {
  static meta = {
		title: 'CommentContent',
    parent: 'Comment',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE,
		description: 'A comment can contain content.'
	};
  rootClasses = [ CSS.content ];
  groups = {
    author: CommentAuthor,
    meta: CommentMeta,
    text: CommentText,
    actions: CommentActions
  }
}
