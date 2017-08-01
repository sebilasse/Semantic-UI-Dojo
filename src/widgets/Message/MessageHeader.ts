import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/message.min.css';
@theme(CSS)
/**
 * A message can contain a header.
 */
export default class MessageHeader extends Base {
  static meta = {
		title: 'MessageHeader',
    parent: 'Message',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.ATOM,
		description: 'A message can contain a header.'
	}
	rootClasses = [ CSS.header ];
}
