import { META, Base, Properties, theme } from '../../lib/main';
import CardDescription from './CardDescription';
import CardHeader from './CardHeader';
import CardMeta from './CardMeta';
import * as CSS from './styles/card.min.css';

/**
 * A card can contain blocks of content or extra content
 * meant to be formatted separately from the main content.
 */
export interface CardContentProps extends Properties {
  /** Shorthand for CardDescription. */
  description?: string | Properties;
  /** Shorthand for CardHeader. */
  header?: string | Properties;
  /** Shorthand for CardMeta. */
  meta?: string | Properties;
  /** Shorthand for primary content of CardContent. */
}

@theme(CSS)
export default class CardContent extends Base<CardContentProps> {
  static meta = {
    title: 'CardContent',
    parent: 'Card',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE
  };
	rootClasses = [ CSS.content ];
  groups = {description: CardDescription, header: CardHeader, meta: CardMeta}
}
