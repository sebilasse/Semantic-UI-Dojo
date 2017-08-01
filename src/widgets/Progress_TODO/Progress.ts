import { DNode, Properties, Base, theme, classy, v, w } from '../../lib/main';
import { META, POS, COLOR, CALC, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/progress.min.css';

/**
 * A progress bar shows the progression of a task.
 */
export interface ProgressProps extends Properties {
  /** A progress bar can show activity. */
  active?: boolean;
  /** A progress bar can attach to and show the progress of an element (i.e. Card or Segment). */
  attached?: keyof typeof POS.TB;
  /** Whether success state should automatically trigger when progress completes. */
  autoSuccess?: boolean;
  /** A progress bar can have different colors. */
  color?: keyof typeof COLOR;
  /** A progress bar be disabled. */
  disabled?: boolean;
  /** A progress bar can show a error state. */
  error?: boolean;
  /** An indicating progress bar visually indicates the current level of progress of a task. */
  indicating?: boolean;
  /** A progress bar can have its colors inverted. */
  inverted?: boolean;
  /** Can be set to either to display progress as percent or ratio. */
  label?: string | Properties; // customitemShorthand
  /** Current percent complete. */
  percent?: number | string; /* TODO  customdisallow(['total', 'value']) */
  /** Decimal point precision for calculated progress. */
  precision?: number;
  /** A progress bar can contain a text value indicating current progress. */
  progress?: boolean | keyof typeof CALC;
  /** A progress bar can vary in size. */
  size?: keyof typeof SIZE.PROGRESS;
  /** A progress bar can show a success state. */
  success?: boolean;
  /**
   * For use with value.
   * Together, these will calculate the percent.
   * Mutually excludes percent.
   */
  total?: number | string; /* TODO customdemand(['value']), customdisallow(['percent']) */
  /**
   * For use with total. Together, these will calculate the percent. Mutually excludes percent.
   */
  value?: number | string; /* TODO customdemand(['total']), customdisallow(['percent']) */
  /** A progress bar can show a warning state. */
  warning?: boolean;
}

@theme(CSS)
export default class Progress extends Base<ProgressProps> {
  static meta = {
    title:  'Progress',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ORGANISM
  };
  get percent(): number {
    const _perc = Number(this.properties.percent);
    const total = Number(this.properties.total);
    const value = Number(this.properties.value);
    const { precision, ...rest } = this.properties;
    let percentRes: number = (_perc !== void 0) ? _perc :
      ((total !== void 0 && value !== void 0) ? (value / total * 100) : 0);
    if (typeof precision === 'number') {
      percentRes = Number(_perc.toPrecision(precision));
    }
    if (typeof percentRes === 'number') {
      return (percentRes >= 0 && percentRes <= 100) ? percentRes :
        (percentRes > 100 ? 100 : 0)
    }
    return 0;
  }

  renderProgress(percent: number = this.percent, total: number = 100, value: number = 0) {
    const { precision, progress } = this.properties;
    if (!progress && precision === void 0) return;
    return v('div', {classes: this.classes(CSS.progress)}, [
      (progress !== 'ratio' ? `${percent}%` : `${value}/${total}`)
    ]);
  }

	render() {
		let {
      active, attached, color, disabled, error, indicating, inverted, size,
      success, warning,
      percent, value, total,
      label, autoSuccess, className = null, ...rest
		} = this.properties;
    percent = Number(this.properties.percent) || 0;
    value = Number(this.properties.value) || 0;
    total = Number(this.properties.total) || 0;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const isActive = (!!active || !!indicating);
    const autoSucc = (!!autoSuccess && (percent >= 100 || value >= total));
    const isSuccess = (!!success || !!autoSucc);
    const props: any = {
      ...rest,
      percent, value, total,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {color, size}),
        ...classy.keys(CSS, {
          active: isActive,
          disabled, error, inverted,
          success: isSuccess,
          warning
        }),
        ...classy.valueKeys(CSS, {attached}),
  			CSS.progress
      ).fixed(...this.fixed),
      dataPercent: Math.floor(percent)
		}

    const ProgressLabel = (!!this.children.length) ?
      v('div', {classes: this.classes(CSS.label)}, this.children) :
      Base.create(label, {classes: this.classes(CSS.label)}) || null;

    if (!children.length) {
      children.push(v('div', {
        classes: this.classes(CSS.bar),
        style: { width: `${percent.toString()}%` }
      }, [this.renderProgress(percent, total, value) || null]));
      children.push(ProgressLabel)
    }

		return v(ElementType, props, children);
	}
}
