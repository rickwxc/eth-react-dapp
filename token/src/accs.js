import web3 from './web3obj';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import Acc from './acc';


class Accs extends Component {
	constructor(props) {
		super(props);
		this.state = {data: false};
	}

	componentDidMount() {
		const s = this;
		web3.eth.getAccounts(function(err, rs){
			var accs = [];
			for(var idx in rs){
				var addr = rs[idx]; 
				var t = {addr:addr}
				accs.push(t);
			}

			s.setState({data: accs});

		});

	}

	render() {
		if (this.state.data) {
			return (
				<div>
				{this.state.data.map((item, index) => (
					<Acc key={'acc_id' + item.addr} addr={item.addr} />
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

export default Accs;
