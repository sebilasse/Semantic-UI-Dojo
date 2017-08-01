import { META, Properties, Base, theme, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/comment.min.css';

/**
 * A comment can contain an image or avatar.
 */
export interface CommentAvatarProps extends Properties {
  /** The src of the image for Avatar. */
  src?: string;
}

@theme(CSS)
export default class CommentAvatar extends Base<CommentAvatarProps> {
  static meta = {
    title: 'CommentAvatar',
    parent: 'Comment',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ATOM,
    description: 'A comment can contain an image or avatar.'
  };
  render() {
		const { src, className = null, ...rest } = this.properties;
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(CSS.avatar).fixed(...this.fixed)
		}
    return v(ElementType, props, [v('img', {src})]);
  }
}
