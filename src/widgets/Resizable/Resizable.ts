import { mixin } from '@dojo/core/lang';
import uuid from '@dojo/core/uuid';
import {
  META, DNode, Properties, Base, beforeRender, theme, classy, is, v
} from '../../lib/main';
import getElementType from '../../lib/getElementType';
//import ResizableBox from './ResizableBox';
import * as progressiveCSS from './main.css';
import * as CSS from './styles/resizable.css';
// TODO FIXME NOT SUI namespace

type Axis = 'both' | 'x' | 'y' | 'none';
type State = {
  resizing: boolean,
  width: number, height: number,
  slackW: number, slackH: number
};
type DragCallbackData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};
export type ResizeCallbackData = {
  node: HTMLElement,
  size: {width: number, height: number}
};
/**
 * TODO DOC
 */
export interface ResizableProps extends Properties {
  /** Initial w / h */
  width: number;
  height: number;
  /** If you change this, be sure to update your css */
  handleSize: [number, number];
  /** If true, will only allow width/height to move in lockstep */
  lockAspectRatio: boolean;
  /** Restricts resizing to a particular axis (default: 'both')
   * 'both' - allows resizing by width or height
   * 'x' - only allows the width to be changed
   * 'y' - only allows the height to be changed
   * 'none' - disables resizing altogether
   */
  axis: Axis;
  /** Min / max size */
  minConstraints: [number, number];
  maxConstraints: [number, number];
  /** Callbacks TODO DOC */
  onResizeStop?: (event: CustomEvent, data: ResizeCallbackData) => any;
  onResizeStart?: (event: CustomEvent, data: ResizeCallbackData) => any;
  onResize?: (event: CustomEvent, data: ResizeCallbackData) => any;
  /** These will be passed wholesale to DraggableCore */
  draggableOpts?: Object;
}

@theme(CSS)
export default class Resizable extends Base<ResizableProps> {
  static meta = {
    title: 'Resizable',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ORGANISM
  };
  //static Box = ResizableBox;

  private resizing: boolean = false;
  private width: number;
  private height: number;
  private slackW: number = 0;
  private slackH: number = 0;

  lockAspectRatio(width: number, height: number, aspectRatio: number): [number, number] {
    height = width / aspectRatio;
    width = height * aspectRatio;
    return [width, height];
  }

  // If you do this, be careful of constraints
  runConstraints(width: number, height: number): [number, number] {
    const { minConstraints, maxConstraints, lockAspectRatio } = this.properties;
    const [min, max] = [minConstraints, maxConstraints];

    if (lockAspectRatio) {
      const ratio = this.width / this.height;
      height = width / ratio;
      width = height * ratio;
    }
    if (!min && !max) return [width, height];
    const [oldW, oldH] = [width, height];
    // Add slack to the values used to calculate bound position. This will ensure that if
    // we start removing slack, the element won't react to it right away until it's been
    // completely removed.
    let {slackW, slackH} = this;
    width += slackW;
    height += slackH;
    if (min) {
      width = Math.max(min[0], width);
      height = Math.max(min[1], height);
    }
    if (max) {
      width = Math.min(max[0], width);
      height = Math.min(max[1], height);
    }
    // If the numbers changed, we must have introduced some slack. Record it for the next iteration.
    slackW += (oldW - width);
    slackH += (oldH - height);
    if (slackW !== this.slackW || slackH !== this.slackH) {
      this.slackW = slackW;
      this.slackH = slackH;
    }
    return [width, height];
  }
  /**
   * Wrapper around drag events to provide more useful data.
   *
   * @param  {String} handlerName Handler name to wrap.
   * @return {Function}           Handler function.
   */
  resizeHandler(handlerName: string): Function {
    return (e: CustomEvent | MouseEvent, {node, deltaX, deltaY}: DragCallbackData) => {

      const { axis } = this.properties;
      // Axis restrictions
      const canDragX = axis === 'both' || axis === 'x';
      const canDragY = axis === 'both' || axis === 'y';

      // Update w/h
      let width = this.width + (canDragX ? deltaX : 0);
      let height = this.height + (canDragY ? deltaY : 0);

      // Early return if no change
      const widthChanged = width !== this.width, heightChanged = height !== this.height;
      if (handlerName === 'onResize' && !widthChanged && !heightChanged) return;

      [width, height] = this.runConstraints(width, height);

      // Set the appropriate state for this handler.
      //const newState = {};
      if (handlerName === 'onResizeStart') {
        this.resizing = true;
      } else if (handlerName === 'onResizeStop') {
        this.resizing = false;
        this.slackW = this.slackH = 0;
      } else {
        // Early return if no change after constraints
        if (width === this.width && height === this.height) return;
        this.width = width;
        this.height = height;
      }

      const hasCb = typeof this.properties[handlerName] === 'function';
      if (hasCb) {
        // TODO FIXME from SyntheticEvent etc :
        // if (typeof e.persist === 'function') e.persist();

        //this.setState(newState, () => this.props[handlerName](e, {node, size: {width, height}}));
      } else {
        //this.setState(newState);
      }
    };
  }

  @beforeRender()
  myBeforeRender(renderFunction: () => DNode | DNode[], properties: ResizableProps, children: any) {
    if (!Array.isArray(properties.handleSize)) { properties.handleSize = [20, 20] }
    if (typeof properties.lockAspectRatio !== 'boolean') { properties.lockAspectRatio = false }
    if ((<any>properties.axis) === false) {
      properties.axis = 'none'
    } else if (!properties.axis) {
      properties.axis = 'both'
    }
    if (!Array.isArray(properties.minConstraints)) { properties.minConstraints = [20, 20] }
    if (!Array.isArray(properties.maxConstraints)) { properties.maxConstraints = [Infinity, Infinity] }
    // If parent changes height/width, set that in our state.
    if (!this.resizing &&
        (properties.width !== this.properties.width || properties.height !== this.properties.height)) {
      this.width = properties.width;
      this.height = properties.height
    }
    return renderFunction;
  }
	render() {
		const {
      draggableOpts, width, height, handleSize,
      lockAspectRatio, axis, minConstraints, maxConstraints,
      onResize, onResizeStop, onResizeStart,
      key, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
  			CSS.resizable
      ).fixed(...this.fixed)
		}
/*
// What we're doing here is getting the child of this element, and cloning it with this element's props.
// We are then defining its children as:
// Its original children (resizable's child's children), and
// A draggable handle.
return cloneElement(children, {
  ...rest,
  className,
  children: [
    children.props.children,
    <DraggableCore
      {...draggableOpts}
      key="resizableHandle"
      onStop={this.resizeHandler('onResizeStop')}
      onStart={this.resizeHandler('onResizeStart')}
      onDrag={this.resizeHandler('onResize')}
      >
      <span className="react-resizable-handle" />
    </DraggableCore>
  ]
});
TODO FIXME
*/
const children: any = [];

		return v(ElementType, props, children);
	}
}
