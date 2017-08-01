/* TODO FIXME i18n mixin */
declare const process: any;

import { lang } from '@dojo/core/main';
import { mixin } from '@dojo/core/lang';
import uuid from '@dojo/core/uuid';
import { DNode as _DNode, WNode, Constructor, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase, beforeRender as _br, afterRender as _ar } from '@dojo/widget-core/WidgetBase';
import { ThemeableMixin, ThemeableProperties, theme as _theme }
  from '@dojo/widget-core/mixins/Themeable';
import { v as _v, w as _w } from '@dojo/widget-core/d';
import getElementType from './getElementType';
import _classy from './CSS';
//import { is } from '../../../../util/is'; TODO FIXME due to dojo bugs "outside source ..."
import { META as _meta } from './SUI';

/* Detect or check a type */
/**
 * is
 * Determines a Json Schema type or JS type or the equality of data-type/type
 *
 * @name is
 * @function
 *
 * @param {Array} data - Any data
 * @param {Object} evtType - Any Json Schema type or JS type
 *
 * @return {String|Boolean}
 * The SCHEMATYPE (JSON Schema) OR if not available JS type OR
 * if `evtType` is supplied the equality of data's type and `evtType`
 */
export type TOF = 'undefined'|'null'|'NaN'|'number'|'integer'|'string'|'boolean'|'symbol'
  |'function'|'object'|'array';
export type KNOWN = string | number | boolean | symbol | object;
export function stub(...args: any[]) { return args }

export function is(data: any, evtType: TOF): data is KNOWN;
export function is(data: any, evtType: TOF): string|boolean {
  let type: string = (typeof data);
  if (data === void 0) {
    type = 'undefined';
  } else if (data === null) {
    type = 'null';
  } else if (typeof data === 'number') {
    if (isNaN(data)) {
      type = 'NaN';
    } else {
      type = ((isFinite(data) && Math.floor(data) === data)) ? 'integer' : 'number';
    }
  } else if (typeof data === 'object') {
    type = (data instanceof Array) ? 'array' : 'object';
  } else {
    type = (typeof data);
  }
  if (typeof evtType === 'string') {
    return (evtType === 'number' && type === 'integer') ? true : (evtType === type);
  }
  return type;
}

export const META = _meta;
export const theme = _theme;
export const classy = _classy;
export const WBase = ThemeableMixin(WidgetBase);
export const v = _v;
export const w = _w;
export const beforeRender = _br;
export const afterRender = _ar;
export type DNode = _DNode;
export type RNode<W = DNode> = W | DNode | string;

/* A helper for group widgets */
export function mapItems(items: any, widget: any): DNode[] {
  return items.map((o: any) => {
    const key = o.key || o.childKey || [o.label, o.title].join('-'); // TODO FIXME uuid
    const props = {key, ...o};
    return !!widget.create ? widget.create(props) : w(widget, props);
  });
}

/* @demo decorator --> JSON Schema, Meta --> Demo TODO */
export function demo(o: any) {
  console.log('DEMO')

}

/* BASE */
export interface Properties extends WidgetProperties, ThemeableProperties {
  [key: string]: any;
  key?: string;
  childKey?: any;
  /** Primary content. */
  content?: RNode<any>;
  children?: any[];
  /** Additional classes. */
  className?: string|string[];
  /** An element type to render as (string or function). */
  as?: string;
  onClick?: (e: MouseEvent & TouchEvent, props?: any) => any;
}

export class Base<P extends Properties = Properties, C extends DNode = DNode>
extends ThemeableMixin(WidgetBase)<P> {
  //static meta = {};
  static schema: any = {};
  static defaultProps: any = {};
  /* internal shorthand to customize the `content` key */
  primaryContent?: string;
  /* internal shorthand for the Array from className */
  fixed: any[] = [];
  /* two helpers for stateless widgets having only css classes
  ** and maybe children with only CSS */
  rootClasses: any = [];
  groups: any = {};

  static isDojoWidget(val: any) {
    return typeof val === 'object' &&
      !!val.type && val.type.toString() === 'Symbol(Identifier for a WNode.)'
  }
  static isPropsObject(val: any) {
    return is(val, 'object') && !this.isDojoWidget(val);
  }
  onClick(e: MouseEvent & TouchEvent, props?: any) { return e }
  /* default mapper for .create from primitive values */
  static mapPrimitiveValue(value: any): any {
    return { content: value }
  }
  static create(val: any, options: any = {}): WNode {

    if (typeof this !== 'function' && typeof this !== 'string') {
      throw new Error('create() Widget must be a string or function.')
    }
    // short circuit noop values
    if (is(val, 'null') || is(val, 'boolean')) { return w(this, {}, []) }

    const valIsString = is(val, 'string');
    const valIsNumber = is(val, 'number');

    // TODO :
    const isDojoWidget = this.isDojoWidget(val);
    const isPropsObject = this.isPropsObject(val);
    const isPrimitiveValue = valIsString || valIsNumber || is(val, 'array');

    // unhandled type return null
    /* eslint-disable no-console */
    if (!isDojoWidget && !isPropsObject && !isPrimitiveValue) {
      if (process.env.NODE_ENV !== 'production') {
        console.error([
          'Shorthand value must be a string|number|array|object|WNode.',
          ' Use null|undefined|boolean for none',
          ` Received ${typeof val}.`,
        ].join(''))
      }
      return w(this, {}, [])
    }
    /* eslint-enable no-console */

    // ----------------------------------------
    // Build up props
    // ----------------------------------------
    const { defaultProps = this.defaultProps } = options;
    // User's props
    const usersProps = isDojoWidget && val.props || isPropsObject && val ||
      isPrimitiveValue && this.mapPrimitiveValue(val);
    // Override props
    //let { options = {} } = options
    options = is(options, 'function') ?
      (<any>options)({ ...defaultProps, ...usersProps }) : options
    // Merge props
    /* eslint-disable react/prop-types */
    const props = { ...options, ...defaultProps, ...usersProps }
    // Merge style
    const dP: any = defaultProps;
    const oP: any = options;
    if (dP.style || oP.style || usersProps.style) {
      props.style = { ...dP.style, ...usersProps.style, ...oP.style }
    }

    // ----------------------------------------
    // Get key
    // ----------------------------------------

    // Use key, childKey, or generate key
    if (!props.key) {
      const { childKey } = props

      if (childKey) {
        // apply and consume the childKey
        props.key = typeof childKey === 'function' ? childKey(props) : childKey
        delete props.childKey
      } else if (valIsString || valIsNumber) {
        // use string/number shorthand values as the key
        props.key = `${val}_${uuid()}`
      }
    }

    // ----------------------------------------
    // Create Element
    // ----------------------------------------

    // Create Dojo2Elements from built up props
    const children: any[] = (Array.isArray(options) ? options : []);
    if (isPrimitiveValue || isPropsObject) {
      return w(this, {...props}, children)
    }
    return w(this, {}, [])
  }

  protected handleClick(e: MouseEvent & TouchEvent) {
    const { onClick } = this.properties
    if (onClick) { this.onClick(e, this.properties) }
  }

  protected evt(type: string, detail: any = {}, currentTarget?: EventTarget, emitter?: any) {
    const action = `on${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    let evt: Event;
    if (Base.isDojoWidget(emitter)) {
      evt = emitter.widgetConstructor.prototype.evt(type, detail, currentTarget||emitter);
    } else if (!(detail instanceof CustomEvent)) {
      evt = new CustomEvent(type, { detail });
      Object.defineProperty(evt, 'currentTarget', {value: currentTarget, enumerable: true});
      Object.defineProperty(evt, 'target', {value: this, enumerable: true});
    } else {
      evt = mixin({}, detail, {type});
    }
    if (!!this.properties && is(this.properties[action], 'function')) {
      this.properties[action](evt);
    }
    return evt
  }

  @beforeRender()
  myBeforeRender(renderFunction: () => DNode | DNode[], properties: P, children: C) {
    let fixedClasses: string[] = [];
    if (Array.isArray(properties.className)) {
      fixedClasses = properties.className.filter((cl: any) => (typeof cl === 'string' && !!cl.length))
    } else if (typeof properties.className === 'string') {
      fixedClasses = (properties.className as string).split(' ').filter(s => !!s.length);
    }
    this.fixed = fixedClasses||[];
    return renderFunction;
  }
  /* The default render has no logic but handles CSS based on
  ** this.meta, this.rootClasses, this.groups */
  render(): DNode {
		let { content, ...rest }: Properties = this.properties;
    const props: any = this.properties;
    if (!content && !!this.primaryContent && !!(<any>this)[this.primaryContent]) {
      content = (<any>this)[this.primaryContent];
    }

    if (!!Object.keys(this.groups).length) {
      let key: string;
      for (key in this.groups) {
        if (props[key]) {
          console.log('groups', key, props[key], this.groups);
          this.children.push(w(this.groups[key], this.properties, [props[key]]))
          //;
        }
      }
    }

    if (typeof this.rootClasses === 'function') {
      this.rootClasses = this.rootClasses()
    } /* TODO FIXME */
    const myClasses = this.rootClasses.filter((cl: any) => !(typeof cl === 'string'));
    const myFixed = this.rootClasses.filter((cl: any) => (typeof cl === 'string'));
    //const userFixed = Array.isArray(className) ? className : (className||'').split(' ')
    //console.log('classes:',myClasses,myFixed)
    //console.log('children:', (!this.children.length && !!content) ? [content] : this.children)
		return v(getElementType(this, this.properties), {
      ...rest,
			classes: this.classes(...myClasses).fixed(...myFixed)
		}, [content, ...this.children]);
	}
}
