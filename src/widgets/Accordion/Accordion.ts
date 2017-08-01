import { mixin } from '@dojo/core/lang';
import uuid from '@dojo/core/uuid';
import { META, DNode, Properties, Base, theme, classy, is, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import AccordionPanel, { AccordionPanelProps } from './AccordionPanel';
import AccordionContent from './AccordionContent';
import AccordionTitle from './AccordionTitle';
import AccordionMeta from './AccordionMeta';
import * as progressiveCSS from './main.css';
import * as CSS from './styles/accordion.min.css';
// TODO FIXME AutoControlled see trySetState, setState
// -> EVENT INTERFACE TYPES

/**
 * An accordion allows users to toggle the display of sections of content.
 */
export interface AccordionProps extends Properties {
  /** Index of the currently active panel. */
  activeIndex?: string | string[];
  /** Only allow one panel open at a time. */
  exclusive?: boolean;
  /** Format to take up the width of it's container. */
  fluid?: boolean;
  /** Format for dark backgrounds. */
  inverted?: boolean;
  /**
   * Create simple accordion panels from an array of
   * { text: <DNode>, meta?: <DNode>, content: <DNode> } objects.
   * Object can optionally define an `active` key to open/close the panel.
   * Object can optionally define a `key` key used for title and content nodes' keys.
   * Mutually exclusive with children. TODO
   */
  panels?: AccordionPanelProps[];
  /** Adds some basic styling to accordion panels. */
  styled?: boolean;
  /**
   * Called when a panel is opened or closed.
   *
   * @param {CustomEvent} event - The Event.
   */
  onChange?: (event: CustomEvent) => void;
  /**
   * Called when a panel is opened.
   *
   * @param {CustomEvent} event - The Event.
   */
  onOpen?: (event: CustomEvent) => void;
  /**
   * Called when a panel is closed.
   *
   * @param {CustomEvent} event - The Event.
   */
  onClose?: (event: CustomEvent) => void;
  /**
   * Called when a panel is clicked.
   *
   * @param {CustomEvent} event - The Event.
   */
  onClick?: (event: MouseEvent & TouchEvent) => void;
}

@theme(CSS)
export default class Accordion extends Base<AccordionProps> {
  static meta = {
    title: 'Accordion',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ORGANISM
  };
  static Panel = AccordionPanel;
  static Content = AccordionContent;
  static Title = AccordionTitle;
  static Meta = AccordionMeta;
  opened: any = {};
  lastOpen: string;

  public panels: DNode[] = [];
  private _initialized = false;

  private _onExclusive(e: CustomEvent) {
    const closed = this.panels.filter((p: any) => p.properties.key === this.lastOpen);
    this.opened[this.lastOpen] = false;
    if (closed.length === 1) {
      const detail = {key: this.lastOpen, action: 'close', open: this.opened};
      this.evt('close', detail, void 0, closed[0]);
    }
  }
  private _onClick(e: CustomEvent) {
    const { onClick } = this.properties;
    /* shallow copy -> only clicks after open state panel as open */
    e.detail.open = mixin({}, this.opened);
    this.evt('click', e);
  }
  private _onChange(e: CustomEvent): void {
    this.opened[e.detail.key] = (e.detail.action === 'open');
    e.detail.open = this.opened;
    this.invalidate();
    this.evt('change', e);
    this.evt(e.detail.action, e)
    if (this.properties.exclusive) { this._onExclusive(e) }
    if (e.detail.action === 'open') { this.lastOpen = e.detail.key }
  }

  isActive(key: string|string[]) {
    const keyActive = (_key: string) => !!this.opened[_key];
    return (Array.isArray(key) && !!key.filter(keyActive).length)
      || (typeof key === 'string' && keyActive(key)) || false
  }

  renderPanels(exclusiveId?: string) {
    const { exclusive, panels = [] } = this.properties;
    this.panels = panels.map((o: any, i: number) => {
      const key = `panel-${i}`;
      if (!this._initialized) { this.opened[key] = o.active || false; }
      const panel = AccordionPanel.create({
        ...o,
        exclusiveId: exclusiveId || null,
        active: !!this.opened[key],
        key,
        onAccordionChange: this._onChange,
        onAccordionClick: this._onClick
      });
      if (!this._initialized && o.active) { this.lastOpen = key }
      return panel
    });
    return this.panels
  }

  renderChildren(exclusiveId?: string) {
    const { children = [] } = this.properties
    let titleIndex = 0
    let contentIndex = 0

    return children.map((child: any) => {
      const isTitle = child instanceof AccordionTitle;
      const isContent = child instanceof AccordionContent;
/* TODO FIXME
      if (isTitle) {
        const currentIndex = titleIndex
        const isActive = _.has(child, 'props.active') ? child.props.active : this.isIndexActive(titleIndex)
        const onClick = (e: MouseEvent & TouchEvent) => {
          this.handleTitleClick(e, currentIndex)
          if (child.props.onClick) child.props.onClick(e, currentIndex)
        }
        titleIndex++
        return cloneElement(child, { ...child.props, active: isActive, onClick })
      }

      if (isContent) {
        const isActive = _.has(child, 'props.active') ? child.props.active : this.isIndexActive(contentIndex)
        contentIndex++
        return cloneElement(child, { ...child.props, active: isActive })
      }
*/
      return child
    })
  }

	render() {
		const {
      fluid, inverted, panels = [], styled, exclusive = true,
      key, ...rest
		} = this.properties;

    const eId = exclusive && (key || uuid()) || void 0;
    let children: any = !!panels ? this.renderPanels(eId) : this.renderChildren(eId);
    if (!!exclusive) {
      children.push(
        v('input', {
          type: 'radio', name: eId, id: `close_${eId}`,
          classes: this.classes().fixed(progressiveCSS.close),
          onchange: this._onExclusive
        })
      )
    }
    this._initialized = true;

    const ElementType = getElementType(this, this.properties, () => 'fieldset');
    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {}),
        ...classy.keys(CSS, {fluid, inverted, styled}),
  			CSS.accordion
      ).fixed(...this.fixed)
		}
    // <input type="radio" name="_groupID" id="close_groupId">
		return v(ElementType, props, children);
	}
}
