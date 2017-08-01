import { Base, theme, classy, v, w } from '../../lib/main';
import { META, ALIGN } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Grid, {GridProps} from '../Grid/Grid';
import * as CSS from './styles/container.min.css';

/**
 * A container limits content to a maximum width.
 */
export interface ContainerProps extends GridProps {
  /** Container without maximum width. */
  fluid?: boolean;
  /** Reduce maximum width to more naturally accommodate text. */
  text?: boolean;
  /** Align container text. */
  textAlign?: keyof typeof ALIGN.TEXT;
}

@theme(CSS)
export default class Container extends Base<ContainerProps> {
  static meta = {
    title: 'Container',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
	render() {
		const {
      fluid, text,
      textAlign,
      className = null, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);

    const rootProps = {...rest, classes: this.classes(
      CSS.ui,
      ...classy.keys(CSS, {fluid, text}),
      ...classy.textAlign(CSS, {textAlign}),
      CSS.container
    ).fixed(...this.fixed)}

    // For convenience allow GridProperties because a Grid can be a Container
    const gridKeys = {
      centered:1,container:1,doubling:1,inverted:1,stackable:1,stretched:1,
      celled:1,divided:1,padded:1,relaxed:1,verticalAlign:1,reversed:1,columns:1
    }
    let key;
    for (key in gridKeys) {
      if (!!(<any>this.properties)[key]) {
        const children = [w(Grid, rest, this.children)];
        return v(ElementType, rootProps, children);
      }
    }
    // ...

		return v(ElementType, rootProps, this.children);
	}
}
