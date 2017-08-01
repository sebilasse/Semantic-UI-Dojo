import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/message.min.css';
@theme(CSS)
/**
 * A message list can contain an item.
 */
export default class MessageItem extends Base {
  static meta = {
		title: 'MessageItem',
    parent: 'MessageContent',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.MOLECULE,
		description: 'A message list can contain an item.'
	}
	rootClasses = [ CSS.content ];
  defaultProps = { as: 'li' }
}
