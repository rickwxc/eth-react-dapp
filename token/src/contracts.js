import web3 from './web3obj';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import Contract from './contract';
import smcs from './smcs';


class Contracts extends Component {
	constructor(props) {
		super(props);
		this.state = {data: false};
	}

	componentDidMount() {
		const s = this;


		s.setState({data: smcs['contracts']});
		/*
		web3.eth.getAccounts(function(err, rs){
			var accs = [];
			for(var idx in rs){
				var addr = rs[idx]; 
				var t = {addr:addr}
				accs.push(t);
			}


		});
		*/

	}

	render() {
		if (this.state.data) {
			return (
				<div>

				{Object.keys(this.state.data).map( (key) => (
					<Contract key={'smt_id' + this.state.data[key].i.addr} sm={this.state.data[key]} />
				))}



				</div>
			)
		}

		return (
			<Header as='h3' textAlign='center'>
			Loading ....
			</Header>
		);

	}

}

export default Contracts;

