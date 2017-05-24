import { h, Component } from 'preact';
import style from './style.less';


export default class Student extends Component {
	render() {
		return (
			<div class={style.profile}>
				<h1>{this.props.data.fullName}</h1>
				<h2>{this.props.data.handle}: {this.props.data.score}</h2>
			</div>
		);
	}
}
