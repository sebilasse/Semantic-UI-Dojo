import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/comment.min.css';
@theme(CSS)
/**
 * A comment can contain text.
 */
export default class CommentText extends Base {
  static meta = {
		title: 'CommentText',
    parent: 'CommentContent',
		namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ATOM,
		description: 'A comment can contain text.'
	};
	rootClasses = [ CSS.text ];
}
