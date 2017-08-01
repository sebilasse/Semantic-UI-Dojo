import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/comment.min.css';
@theme(CSS)
/**
 * A comment can contain metadata about the comment,
 * an arbitrary amount of metadata may be defined.
 */
export default class CommentMeta extends Base {
  static meta = {
		title: 'CommentMeta',
    parent: 'CommentContent',
		namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ATOM,
		description: `A comment can contain metadata about the comment,
    an arbitrary amount of metadata may be defined.`
	};
	rootClasses = [ CSS.metadata ];
}
