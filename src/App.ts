import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import * as rTheme from './themes/redaktor-default/site.min.css';
import Container from './widgets/Container/Container';

import Accordion from './widgets/Accordion/Accordion';
import Checkbox from './widgets/Checkbox/Checkbox';

import Card from './widgets/Card/Card';
import Cards from './widgets/Card/Cards';

export default class App extends WidgetBase<WidgetProperties> {
	e(msg: string) { return ((e: any) => { console.log(msg, e) }); }

	protected render(): DNode {
		return w(Container, {theme: rTheme}, [
			v('span',['exclusive true']),
			w(Accordion, {
				key: '_1',
				exclusive: true,
				icon: true,
				styled: true,
				onChange: this.e('user change'), onOpen: this.e('user open'),
				onClose: this.e('user close'), onClick: this.e('user click'),
				panels: [
					{title: 'title', meta: 'meta', content: 'Lorem Ipsum'},
					{title: 'title2', meta: 'meta2', content: 'Lorem Ipsum dolor sunt', active: true},
					{title: 'title3', meta: 'meta3', content: 'Lorem Ipsum 3'},
				]
			}),
			v('span',['exclusive false']),
			w(Accordion, {
				key: '_1',
				exclusive: false,
				icon: true,
				styled: true,
				onChange: this.e('user change'), onOpen: this.e('user open'),
				onClose: this.e('user close'), onClick: this.e('user click'),
				panels: [
					{title: 'title', meta: 'meta', content: 'Lorem Ipsum'},
					{title: 'title2', meta: 'meta2', content: 'Lorem Ipsum dolor sunt', active: true}
				]
			}),
			v('div',[
				w(Checkbox, {
					name: 'xy',
					label: 'hello',
					value: '2',
					slider: true,
					onChange: this.e('user change'), onMouseDown: this.e('user mousedown'),
					onClick: this.e('user click')
				})
			])
			/*
			w(Cards, {itemsPerRow: 'two'}, [
				w(Card, {
					theme: rTheme,
					inline: true,
					image: 'https://semantic-ui.com/images/avatar2/large/kristy.png',
					header: 'A header',
					meta: 'Some meta',
					description: v('p.red',{},['Hello World. Lorem Ipsum dolor sunt.']),
					extra: 'Lorem Ipsum dolor sunt extra',
					className: 'test two'
				})
			]) */
		]);
	}
}
