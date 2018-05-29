import web3 from './web3obj';
import React, { Component } from 'react';
import { Header, Table, Input , Button, Label} from 'semantic-ui-react'
import Contractcallbutton from './contract_call_button';


class Contractcall extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.fun.name,
			sminst: props.sminst,
			fun: props.fun,
			data: false
		};
	}

	componentDidMount() {

	}

	render() {
		if (this.state.name) {
			if (1){
				return (<div>
						<Contractcallbutton  sminst={this.state.sminst} fun={this.state.fun} />
					</div>)
			}

			return (
				<Table>
				<Table.Body>
				{this.state.fun.inputs.map(function (item, idx) {
					return (
						<Table.Row key={'acc_id_abi' + idx}>
							<Table.Cell >  
								<Input labelPosition='right' type='text' placeholder=''>
									<Label basic>{item.name}</Label>
									<input />
									<Label>{item.type}</Label>
								</Input>
							</Table.Cell >  
						</Table.Row>
					)
				})}

				<Table.Row key={'acc_id_abi_btn'}>
					<Table.Cell >   </Table.Cell>
				</Table.Row>

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

export default Contractcall;

