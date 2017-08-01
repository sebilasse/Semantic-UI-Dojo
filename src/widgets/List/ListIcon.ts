import { Base, theme, classy } from '../../lib/main';
import { META, POS } from '../../lib/SUI';
import Icon, { IconProps } from '../Icon/Icon';
import * as CSS from './styles/list.min.css';

/**
 * A list item can contain an icon.
 */
export interface ListIconProps extends IconProps {
  /** An element inside a list can be vertically aligned. */
  verticalAlign?: keyof typeof POS.TB;
}

@theme(CSS)
export default class ListIcon extends Base<ListIconProps> {
  static meta = {
    title:  'ListIcon',
    parent: 'ListContent',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
	rootClasses = () => [ CSS.icon ].concat(
    !!this.properties.verticalAlign ?
      classy.verticalAlign(CSS, {verticalAlign: this.properties.verticalAlign}) : null
  );
}
