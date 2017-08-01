import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/step.min.css';
@theme(CSS)
/**
 * A step can contain a title.
 */
export default class StepTitle extends Base {
  static meta = {
		title: 'StepTitle',
    parent: 'StepContent',
		namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.ATOM,
		description: 'A step can contain a title.'
	};
	rootClasses = [ CSS.title ];
  primaryContent = 'title';
}
