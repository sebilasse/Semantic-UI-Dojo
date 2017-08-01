import { numberToWord } from './SUI';
/*
 * There are 3 prop patterns used to build up the className for a component.
 * Each utility here is meant for use in a classnames() argument.
 */
const classy = {
  /**
   * Props where only the prop key is used in the className.
   * @param {*} CSS A compiled CSS
   * @param {string} o properties
   *
   * @example
   * <Label tag />
   * <div class="ui tag label"></div>
   */
  keys: (CSS: any, o: any) => {
    let k: string, a: any = [];
    for (k in o) { a.push(!!o[k] && !!CSS[k] && CSS[k]) }
    return a;
  },
  /**
   * Props that require both a key and value to create a className.
   * @param {*} CSS A compiled CSS
   * @param {string} o properties
   *
   * @example
   * <Label corner='left' />
   * <div class="ui left corner label"></div>
   */
  valueKeys: (CSS: any, o: any) => {
    let k: string, a: any = [];
    for (k in o) {
      if (!!CSS[k] && typeof o[k] === 'string') {
        a.push(CSS[o[k]]);
        a.push(CSS[k]);
      }
    }
    return a;
  },
  /**
   * Props where only the value is used in the className (e.g. color values).
   * @param {*} CSS A compiled CSS
   * @param {string} o properties
   *
   * @example
   * <Card tag />
   * <div class="ui red card"></div>
   */
  values: (CSS: any, o: any) => {
    let k: string, a: any = [];
    for (k in o) {
      if (!!o[k] && !!CSS[o[k]]) { a.push(CSS[o[k]]) }
    }
    return a;
  },
  /**
   * Props whose key will be used in className, or value and key.
   * @param {*} CSS A compiled CSS
   * @param {string} o properties
   *
   * @example Key Only
   * <Label pointing />
   * <div class="ui pointing label"></div>
   *
   * @example Key and Value
   * <Label pointing='left' />
   * <div class="ui left pointing label"></div>
   */
  generic: (CSS: any, o: any) => {
    let k: string, a: any = [];
    for (k in o) {
      if (o[k] === true) {
        a.push(CSS[k])
      } else {
        const strs = (typeof k === 'string' && typeof o[k] === 'string');
        if (!!strs) {
          a.push(CSS[o[k]]);
          a.push(CSS[k]);
        }
      }
    }
    return a
  },
  /**
   * The "verticalAlign" prop follows the useValueAndKey.
   * @param {*} CSS A compiled CSS
   * @param {*} val The value of the "verticalAlign" prop
   *
   * @example
   * <Grid verticalAlign='middle' />
   * <div class="ui middle aligned grid"></div>
   */
  verticalAlign: (CSS: any, val: any) => {
    const o: any = {}; o.aligned = val;
    return classy.valueKeys(CSS, o)||null;
  },
  /**
   * The "textAlign" prop follows the useValueAndKey except when the value is "justified'.
   * In this case, only the class "justified" is used, ignoring the "aligned" class.
   * @param {*} CSS A compiled CSS
   * @param {*} val The value of the "textAlign" prop
   *
   * @example
   * <Container textAlign='justified' />
   * <div class="ui justified container"></div>
   *
   * @example
   * <Container textAlign='left' />
   * <div class="ui left aligned container"></div>
   */
  textAlign: (CSS: any, val: any) =>
    val === 'justified' ? (CSS.justified ? [CSS.justified] : null) :
    classy.verticalAlign(CSS, val)||null,
  /**
   * Create "X", "X wide" and "equal width" classNames.
   * "X" is a numberToWord value and "wide" is configurable.
   * @param {*} CSS A compiled CSS
   * @param {*} val The prop value
   * @param {string} [widthClass=''] The class
   * @param {boolean} [canEqual=false] Flag that indicates possibility of "equal"
   *
   * @example
   * <Grid columns='equal' />
   * <div class="ui equal width grid"></div>
   *
   * <Form widths='equal' />
   * <div class="ui equal width form"></div>
   *
   * <FieldGroup widths='equal' />
   * <div class="equal width fields"></div>
   *
   * @example
   * <Grid columns={4} />
   * <div class="ui four column grid"></div>
   */
  width: (CSS: any, val: any, widthClass = '', canEqual = false) => {
    if (canEqual && val === 'equal') { return 'equal width' }
    const vt = !val ? 'undefined' : typeof val;
    const value = numberToWord(val);
    if ((vt === 'string' || vt === 'number') && widthClass) {
      return !!CSS[widthClass] ? [CSS[value], CSS[widthClass]] : [CSS[value]];
    }
    return CSS[value]
  },
  /**
   * The "only" prop implements control of visibility classes for Grid subcomponents.
   *
   * @param {*} val The value of the "only" prop
   *
   * @example
   * <Grid.Row only='mobile' />
   * <Grid.Row only='mobile tablet' />
   * <div class="mobile only row"></div>
   * <div class="mobile only tablet only row"></div>
   */
  only: (CSS: any, val: any) => {
    if (!val || val === true) { return null }
    const onlyArr: any = [];
    val
      .replace('large screen', 'large-screen')
      .replace('largescreen', 'large-screen')
      .split(' ')
      .forEach((prop: string) => {
        const property = prop.replace('-', ' ');
        if (CSS[property]) {
          onlyArr.push(CSS[property]);
          onlyArr.push(CSS.only);
        }
      });
    return onlyArr;
  }
}
export default classy;
