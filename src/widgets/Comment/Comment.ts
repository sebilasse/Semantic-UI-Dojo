import { Properties, Base, META, theme, classy, v, w } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import Image from '../Image/Image';
import CommentAction from './CommentAction';
import CommentActions, { CommentActionsProps } from './CommentActions';
import CommentAuthor from './CommentAuthor';
import CommentAvatar from './CommentAvatar';
import CommentContent from './CommentContent';
import CommentMeta from './CommentMeta';
import CommentText from './CommentText';
import Comments from './Comments';
import * as CSS from './styles/comment.min.css';

/**
 * A comment displays user feedback to site content.
 */
export interface CommentProps extends Properties {
  /** A comment can contain an image or avatar. Shorthand for CommentAvatar. */
  avatar?: string | Properties;
  /** Shorthand for CommentAuthor. */
  author?: string | Properties;
  /** Shorthand array of props for CommentActions. */
  actions?: (string | CommentActionsProps)[];
  /** Shorthand for CommentMeta. */
  meta?: string | Properties;
  /** Shorthand for primary content of CommentContent. */
  text?: string | Properties;
  /** Comment can be collapsed, or hidden from view. */
  collapsed?: boolean;
  /** A Comment can be inline to maintain the typographic rythm the page
   * (not all themes).
  */
  inline?: boolean;
}

@theme(CSS)
export default class Comment extends Base<CommentProps> {
  static meta = {
    title: 'Comment',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
  static Group = Comments;
  static Author = CommentAuthor;
  static Action = CommentAction;
  static Actions = CommentActions;
  static Avatar = CommentAvatar;
  static Content = CommentContent;
  static Meta = CommentMeta;
  static Text = CommentText;

	render() {
		const {
      avatar, author, actions, meta, text,
      collapsed, inline,
	    className = null, ...rest
		} = this.properties;

		const children = [...this.children];

    const ElementType = getElementType(this, this.properties);
    const props = {
			classes: this.classes(
        ...classy.keys(CSS, {collapsed, inline}),
  			CSS.comment
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }

    if (!!avatar) {
      children.unshift(CommentAvatar.create(avatar));
    }
    if (!!author || !!meta || !!text || !!actions) {
      children.push(w(CommentContent, {author, meta, text, actions}));
    }
		return v(ElementType, rootProps, children);
	}
}
