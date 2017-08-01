import { Properties, Base, theme, classy, v, w } from '../../lib/main';
import { META, COLOR, POS, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon';
import MessageContent from './MessageContent';
import MessageHeader from './MessageHeader';
import MessageList from './MessageList';
import MessageItem from './MessageItem';
import * as CSS from './styles/message.min.css';

/**
 * A message displays information that explains nearby content.
 * @see Form
 */
export interface MessageProps extends Properties {
  /** A message can be formatted to attach itself to other content. */
  attached?: boolean | keyof typeof POS.TB;
  /** A message can be formatted to be different colors. */
  color?: keyof typeof COLOR;
  /** A message can only take up the width of its content. */
  compact?: boolean;
  /** A message may be formatted to display a negative message. Same as `negative`. */
  error?: boolean;
  /** A message can float above content that it is related to. */
  floating?: boolean;
  /** Shorthand for MessageHeader. */
  header?: string | Properties;
  /** A message can be hidden. */
  hidden?: boolean;
  /** A message can contain an icon. */
  icon?: boolean | string | IconProps;
  /** A message may be formatted to display information. */
  info?: boolean;
  // {items: MessageItem}] TODO
  /** Array shorthand items for the MessageList. Mutually exclusive with children. */
  list?: string | Properties;
  /** A message may be formatted to display a negative message. Same as `error`. */
  negative?: boolean;
  /** A message may be formatted to display a positive message. Same as `success`. */
  positive?: boolean;
  /** A message can have different sizes. */
  size?: keyof typeof SIZE.NO_MEDIUM;
  /** A message may be formatted to display a positive message. Same as `positive`. */
  success?: boolean;
  /** A message can be set to visible to force itself to be shown. */
  visible?: boolean;
  /** A message may be formatted to display warning messages. */
  warning?: boolean;
  /**
   * A message that the user can choose to hide.
   * Called when the user clicks the "x" icon. This also adds the "x" icon.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onDismiss?: (event: MouseEvent & TouchEvent, data: MessageProps) => void;
}

@theme(CSS)
export default class Message extends Base<MessageProps> {
  static meta = {
    title:  'Message',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.ORGANISM
  };
  static Content = MessageContent;
  static Header = MessageHeader;
  static List = MessageList;
  static Item = MessageItem;

  protected handleDismiss(e: MouseEvent & TouchEvent) {
    const { onDismiss } = this.properties
    if (onDismiss) onDismiss(e, this.properties)
  }

	render() {
		const {
      color, size,
      compact, error, floating, hidden, icon, info, negative, positive,
      success, visible, warning,
      attached, onDismiss,
      header = null, content = null, list = null, className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
			onclick: this.handleClick,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {color, size}),
        ...classy.keys(CSS, {
          compact, error, floating, hidden, icon, info, negative, positive,
          success, visible, warning
        }),
        ...classy.generic(CSS, {attached}),
  			CSS.message
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    const dismissIcon = onDismiss && Icon.create({name: 'close', onClick: this.handleDismiss});
    children.unshift(dismissIcon||null);
    if (!!children.length) { return v(ElementType, rootProps, children) }
    children.push(Icon.create(icon));
    if (!!header || !!content || !!list) {
      w(MessageContent, {}, [
        MessageHeader.create(header),
        MessageList.create(list),
        (!!content) ? v('p', {}, [content]) : null
      ]);
    }
		return v(ElementType, rootProps, children);
	}
}
