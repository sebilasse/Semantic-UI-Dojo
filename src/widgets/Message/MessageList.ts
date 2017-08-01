import { META, Properties, Base, theme, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import MessageItem from './MessageItem';
import * as CSS from './styles/message.min.css';

/**
 * A message can contain a list of items.
 */
export interface MessageListProps extends Properties {
  /** Shorthand array of props for MessageItem */
  items: (string | Properties)[]
}

export default class MessageList extends Base<MessageListProps> {
  static meta = {
    title:  'MessageList',
    parent: 'Message',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.MOLECULE
  };
  defaultProps = { as: 'ul' };

  render() {
		const { items = [], className = null, ...rest } = this.properties;

		let children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
			classes: this.classes(
        CSS.ui,
  			CSS.list
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props, ...this.defaultProps}
    if (!children.length) { children = items.map(MessageItem.create) }
    return v(ElementType, rootProps, children);
  }
}
