import { META, DNode, Properties, Base, theme, v, w } from '../../lib/main';
import * as progressiveCSS from './main.css';
import * as CSS from './styles/accordion.min.css';

export interface AccordionTitleProps extends Properties { active?: boolean; }

/**
 * A title sub-component for Accordion component (always visible).
*/
@theme(CSS)
export default class AccordionTitle extends Base<AccordionTitleProps> {
  static meta = {
		title: 'AccordionTitle',
    parent: 'AccordionPanel',
		namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ATOM,
		description: 'A title sub-component for Accordion component.'
	};

  render() {
    let { content, active, ...rest } = this.properties;
    return v('div', {
      //...rest,
      classes: this.classes(
        active ? CSS.active : null,
        CSS.title
      ).fixed(progressiveCSS.title, progressiveCSS.icon)
    }, [content, ...this.children]);
  }
}
