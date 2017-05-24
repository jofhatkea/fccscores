import { h, Component } from 'preact';

import Student from './student';

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			students:[],
			message:""
		}
	}
    componentDidMount(){
		this.setState({message: "Asking google for data"});
        fetch("https://spreadsheets.google.com/feeds/list/1jQao8ztXQD40yoYfh9zgwPWoAruW9zehzkyKRyJR9L4/od6/public/values?alt=json")
            .then(e=>e.json())
            .then(data=>{
            	this.parseSheet(data);
            });
	}
	parseSheet(data){
        this.setState({message: "Got data from google, fetching students"});
    	data.feed.entry.forEach(s=>{
    		let student = {
                handle: s.gsx$codecamphandle["$t"],
				fullName: s.gsx$fullname["$t"]
            };
            this.fetchStudent(student);
		});
	}
	fetchStudent(s){
        //this.setState({message: "Fetching "+s.handle});
        let re = /\[ (\d+) \]/ig;
        fetch(`https://www.freecodecamp.com/${s.handle}`)
            .then(e=>e.text())
            .then(data=>{
                s.score=parseInt(re.exec(data)[1]);
                let students = this.state.students.slice();
                students.push(s);
                students.sort((a,b)=>b.score-a.score);
                this.setState({
					students:students
				})
            })
	}
	render() {
		let elems;
		if(this.state.students.length===0){
			elems = <div>Loading</div>
		} else {
			elems = this.state.students.map(e=>{
				return <Student data={e} />
			});
        }
		return (
			<div id="app" style="display:flex; flex-direction: row; flex-wrap: wrap;">
				<h1 style="width: 100vw">App {this.state.message}</h1>
				{elems}
			</div>
		);
	}
}
