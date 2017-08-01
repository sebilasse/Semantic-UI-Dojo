import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/message.min.css';
@theme(CSS)
/**
 * A message can contain a content.
 */
export default class MessageContent extends Base {
  static meta = {
		title: 'MessageContent',
    parent: 'Message',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE,
		description: 'A message can contain a content.'
	}
	rootClasses = [ CSS.content ];
}
