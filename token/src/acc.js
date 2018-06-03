import web3 from './web3obj';
import React, { Component } from 'react';
import smcs from './smcs';
import { Header, Table } from 'semantic-ui-react'


class Acc extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addr: props.addr,
			data: false
		};
	}

	get_bal_of_tk(tk){
		const s = this;
		if (tk.i.balanceOf){
			tk.i.balanceOf(this.state.addr, function(e,rs){ 
				if(e) {
					return;
				}
				s.set_bal(tk.code, rs.toNumber());
			})
		}

	}

	get_bal(idx, tk, addr){
		const s = this;
		tk.i.balanceOf(addr, function(e,rs){ 
			if(e) {
				return;
			}
			var tktmp = {
				key: tk.code,
				code: tk.code,
				bal: rs.toNumber() 
			};
			var ac = s.state.data;
			ac[idx].tks.push(tktmp);
			s.setState({data: ac});
		})
	}

	set_bal(code, v) {
		var data = this.state.data;
		if (!data){
			data = {};
		}
		data[code] = v;

		this.setState({data: data});
	}

	componentDidMount() {

		const this_acc = this;
		web3.eth.getBalance(this.state.addr, function(err, rs){
			var bal = web3.fromWei(rs, 'ether').toNumber();
			this_acc.set_bal('Bal', bal);
		})

		for(var kdx in smcs['tokens']){
			var tk = smcs['tokens'][kdx];
			this_acc.get_bal_of_tk(tk);
		}

	}

	render() {
		if (this.state.data) {
			return (
				<Table>
				<Table.Header>
				<Table.Row>
				<Table.HeaderCell>Addr</Table.HeaderCell>
				<Table.HeaderCell></Table.HeaderCell>
				</Table.Row>
				</Table.Header>
				<Table.Body>
				<Table.Row>
				<Table.Cell >{this.state.addr}</Table.Cell>
				<Table.Cell ></Table.Cell>
				</Table.Row>

				{Object.keys(this.state.data).map( (key) => (
					<Table.Row key={'tkr_'+key}>
					<Table.Cell key={'tk_' + key}> {key}  </Table.Cell>
					<Table.Cell key={'tk_bal_' + key}> {this.state.data[key]} </Table.Cell>
					</Table.Row>
				))}

				</Table.Body>
				</Table>
			)
		}

		return (
			<Header as='h3' textAlign='center'>
			Loading ....
			</Header>
		);

	}

}

export default Acc;


