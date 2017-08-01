import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/comment.min.css';
@theme(CSS)
/**
 * A comment can contain an action.
 */
 // TODO FIXME - direct actions
export default class CommentAction extends Base {
  static meta = {
		title: 'CommentAction',
    parent: 'CommentContent',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ATOM,
		description: 'A comment can contain an action.'
	};
	rootClasses = [ CSS.active ];
  defaultProps = { as: 'a' };
}
