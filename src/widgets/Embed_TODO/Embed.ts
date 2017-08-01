import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, RATIO, VIDEOSILO } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon';
import Image, { ImageProps } from '../Image/Image';
import * as CSS from './styles/embed.min.css';
// TODO FIXME AutoControlled see demand, every, disallow + statics + trySetState

/**
 * An embed displays content from other websites like YouTube videos or Google Maps.
 */
export interface EmbedProps extends Properties {
  /** An embed can be active. */
  active?: boolean;
  /** An embed can specify an alternative aspect ratio. */
  aspectRatio?: keyof typeof RATIO;
  /** Setting to true or false will force autoplay. // TODO demand(['source']) */
  autoplay?: boolean;
  /**
  * Whether to show networks branded UI like title cards,
  * or after video calls to action. // TODO demand(['source'])
  */
  brandedUI?: boolean;
  /** Specifies a default chrome color with Vimeo or YouTube. // TODO demand(['source']) */
  color?: string;
  /** Initial value of active. */
  defaultActive?: boolean;
  /** Whether to prefer HD content. // TODO demand(['source']) */
  hd?: boolean;
  /** Specifies an icon to use with placeholder content. */
  icon?: string | IconProps;
  /** Specifies an id for source. // TODO demand(['source']) */
  id?: string;
  /** A placeholder image for embed. */
  placeholder?: string | ImageProps;
  /** Specifies a source to use. // TODO disallow(['source']) */
  source?: keyof typeof VIDEOSILO;
  /** Specifies a url to use for embed. // TODO disallow(['source']) */
  url?: string;
  /**
   * Called on click.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: EmbedProps) => void;
}

@theme(CSS)
export default class Embed extends Base<EmbedProps> {
  static meta = {
    title: 'Embed',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ORGANISM
  };
  /* TODO */
  static autoControlledProps = [ 'active' ];
  static defaultProps = { icon: 'video play' };
  state: any = {};

  getSrc() {
    const {
      autoplay = true, brandedUI = false, color = '#444444', hd = true,
      id, source, url
    } = this.properties

    if (source === 'youtube') {
      return [
        `//www.youtube.com/embed/${id}`,
        '?autohide=true',
        `&amp;autoplay=${autoplay}`,
        `&amp;color=${encodeURIComponent(color)}`,
        `&amp;hq=${hd}`,
        '&amp;jsapi=false',
        `&amp;modestbranding=${brandedUI}`,
      ].join('')
    }

    if (source === 'vimeo') {
      return [
        `//player.vimeo.com/video/${id}`,
        '?api=false',
        `&amp;autoplay=${autoplay}`,
        '&amp;byline=false',
        `&amp;color=${encodeURIComponent(color)}`,
        '&amp;portrait=false',
        '&amp;title=false',
      ].join('')
    }

    return url
  }

  handleClick(e: MouseEvent & TouchEvent) {
    const { onClick } = this.properties;
    const { active } = this.state;
    if (onClick) { onClick(e, { ...this.properties, active: true }) }
    if (!active) { /* TODO this.trySetState({ active: true }) */ }
  }

	render() {
		const {
      aspectRatio, icon, placeholder, source,
      className = null, ...rest
    } = this.properties;
    const { active } = this.state;
    const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {aspectRatio}),
        ...classy.keys(CSS, {active}),
  			CSS.embed
      ).fixed(...this.fixed),
      onClick: this.handleClick
		}
    if (!!icon) { children.unshift(Icon.create(icon)) }
    if (!!placeholder) {
      children.push(Image.create({className: 'placeholder', src: placeholder}))
    }
    if (!active || !!children.length) {
      return v('div', props, children)
    }
    children.push(v('iframe', {
      title: `Embedded content from ${source}.`,
      allowFullScreen: '',
      frameBorder: '0',
      height: '100%',
      scrolling: 'no',
      src: this.getSrc(),
      width: '100%'
    }));

		return v(ElementType, props, children);
	}
}
