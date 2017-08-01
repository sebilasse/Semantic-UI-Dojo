import { Properties, Base, theme, classy, mapItems, v } from '../../lib/main';
import { META, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Comment, { CommentProps } from './Comment';
import * as CSS from './styles/comment.min.css';

/**
 * Comments can be grouped.
 */
export interface CommentsProps extends Properties {
  /** Comments can be collapsed, or hidden from view. */
  collapsed?: boolean;
  /** Shorthand array of props for Comment. */
  items?: (string | CommentProps)[];
  /** Comments can hide extra information unless a user shows intent to interact with a comment. */
  minimal?: boolean;
  /** Comments can have different sizes. */
  size?: keyof typeof SIZE.NO_MEDIUM;
  /** A comment list can be threaded to showing the relationship between conversations. */
  threaded?: boolean;
}

@theme(CSS)
export default class Comments extends Base<CommentsProps> {
  static meta = {
    title: 'Comments',
    collection: 'Comment',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
	render() {
		const {
      size,
      collapsed, minimal, threaded,
	    items = [], className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);

    const props = {
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {size}),
        ...classy.keys(CSS, {collapsed, minimal, threaded}),
  			CSS.comments
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }
    const content = mapItems(items, Comment);
		return v(ElementType, props, content);
	}
}
