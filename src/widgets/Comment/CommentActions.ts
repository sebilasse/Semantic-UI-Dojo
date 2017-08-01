import { META, Base, theme, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import { CommentProps } from './Comment';
import CommentAction from './CommentAction';
import * as CSS from './styles/comment.min.css';

 // TODO FIXME - direct actions
/**
 * A comment can contain an list of actions a user may perform related to this comment.
 */
export interface CommentActionsProps extends CommentProps {}

@theme(CSS)
export default class CommentActions extends Base<CommentActionsProps> {
  static meta = {
		title: 'CommentActions',
    parent: 'CommentContent',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE
	};
  render() {
		const { actions, className = null, ...rest } = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
			classes: this.classes(
  			CSS.actions
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }

    if (!!actions) {
      children.push(...actions.map((action: any) => CommentAction.create(action)));
    }
		return v(ElementType, rootProps, children);
	}
}
