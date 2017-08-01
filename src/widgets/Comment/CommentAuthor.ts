import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/comment.min.css';
@theme(CSS)
/**
 * A comment can contain an author.
 */
export default class CommentAuthor extends Base {
  static meta = {
		title: 'CommentAuthor',
    parent: 'CommentContent',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ATOM,
		description: 'A comment can contain an author.'
	};
	rootClasses = [ CSS.author ];
}
