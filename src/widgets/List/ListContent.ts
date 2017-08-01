import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, POS } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import ListDescription from './ListDescription';
import ListHeader from './ListHeader';
import * as CSS from './styles/list.min.CSS';

/**
 * A list item can contain a content.
 */
export interface ListContentProps extends Properties {
  /** Shorthand for ListDescription. */
  description?: string | Properties;
  /** List content can be floated left or right. */
  floated?: keyof typeof POS.LR;
  /** Shorthand for ListHeader. */
  header?: string | Properties;
  /** An element inside a list can be vertically aligned. */
  verticalAlign?: keyof typeof POS.TB;
}

@theme(CSS)
export default class ListContent extends Base<ListContentProps> {
  static meta = {
    title:  'ListContent',
    parent: 'List',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const {
      floated, verticalAlign,
      header, description, content = null, className = null, ...rest
		} = this.properties;

    const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {...rest, classes: this.classes(
      ...classy.valueKeys(CSS, {floated}),
      ...classy.verticalAlign(CSS, {verticalAlign}),
      CSS.content
    ).fixed(...this.fixed)};
    if (!!children.length) { return v(ElementType, props, children) }
    if (!!header) { children.push(ListHeader.create(header)) }
    if (!!description) { children.push(ListDescription.create(description)) }
    children.push(content)
    return v(ElementType, props, children);
	}
}
