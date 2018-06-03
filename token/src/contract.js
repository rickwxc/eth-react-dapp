import web3 from './web3obj';
import React, { Component } from 'react';
import smcs from './smcs';
import Contractcall from './contract_call';
import { Header, Table } from 'semantic-ui-react'


class Contract extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sminst: props.sm.i,
			name: props.sm.code,
			data: false
		};

	}

	componentDidMount() {

	}

	render() {
		var smsst = this.state.sminst;
		if (this.state.sminst) {
			return (
				<Table>
				<Table.Header>
				<Table.Row>
				<Table.HeaderCell>{this.state.name}</Table.HeaderCell>
				<Table.HeaderCell></Table.HeaderCell>
				</Table.Row>
				</Table.Header>
				<Table.Body>
				<Table.Row>
				<Table.Cell >Addr</Table.Cell>
				<Table.Cell >{this.state.sminst.address}</Table.Cell>
				</Table.Row>
				{this.state.sminst.abi.map(function (item, idx) {
					if (item.type != "function"){
						return (null)
					}

					return (
						<Table.Row key={'acc_id_abi' + idx}>
							<Table.Cell >{item.name}</Table.Cell>
							<Table.Cell ><Contractcall sminst={smsst} fun={item}
						/></Table.Cell>
						</Table.Row>
					)
				})}



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

export default Contract;
