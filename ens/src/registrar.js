import React, { Component } from 'react';
import web3 from './web3obj';
import ens from './smcs/ens';

import registrar from './smcs/registrar';
import { Grid, List, Header, Table, Input , Button, Label} from 'semantic-ui-react'
import {namehash} from './utils';


class Reg extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			domain: 'cyrtoceratite',
			reg_addr: '',
			auction_st_id: '',
			soft_date: '',
			owner: '',
			resolver: '',
			t0: props.t0,
			network_id: props.network_id,
			reg: false,
			auction_st: {
				0:"Name is available and the auction hasn’t started",
				1:'Name is available and the auction has been started',
				2:'Name is taken and currently owned by someone',
				3:'Name is forbidden',
				4:'Name is currently in the ‘reveal’ stage of the auction',
				5:'Name is not yet available due to the ‘soft launch’ of names.',
			},
		};
		//console.log(this.state.abis);
		//

		var e = web3.eth.contract(ens['abi']).at(ens['addrs'][props.network_id]);

		var this_c = this
		e.owner(namehash(props.t0),function(e,r){

			this_c.setState({reg_addr:r})
			this_c.setState({reg:web3.eth.contract(registrar['abi']).at(r)})
		})

		

	}
	update_inputs(idx, e) {
		var val = e.target.value
		var o = this.state
		o[idx] = val;
		this.setState(o);
	}

	load_soft_date(name) {
		this.setState({'soft_date': ''});
		this.state.reg.getAllowedTime(web3.sha3(this.state.domain), (e, r) => {
			if(e){
				return;
			}
			var dt = new Date(r.toNumber() * 1000);
			this.setState({'soft_date': dt.toString()});
		})
	}

	call_fun(name) {
		var this_com = this;
		var this_state = this.state;

		if(name == 'entries'){
			this_com.setState({'auction_st_id': ''});
			this.state.reg.entries(web3.sha3(this_state.domain), (e,r) =>{
				if(e){
					console.log(e);
					return;
				}
				var ast_id = r[0].toNumber();
				this_com.setState({'auction_st_id': ast_id});
				if(ast_id == 5){
					this_com.load_soft_date();
				}

				var dt = new Date(r[2].toNumber() * 1000);
				this_com.setState({'auction_end_time': dt.toString()});

				var winning_bid = web3.fromWei(r[4], 'ether');
				this_com.setState({'winning_bid': winning_bid.toNumber()});

				var deed_addr = r[1]; 
				this_com.setState({'deed_addr': deed_addr});

				if(deed_addr != '0x'){
					web3.eth.contract(registrar['deed_abi']).at(deed_addr).owner((e, r) => {
						if(e){
							return;
						}
						this_com.setState({'deed_owner': r});
					})
				}

			});
		}
		if(name == 'resolver'){
			/*
			this.state.reg.resolver(namehash(this_state.domain), (e,r) =>{
				this_com.setState({resolver:r});
			});
			*/
		}

	}

  render() {
			var this_com = this;
			var this_state = this.state;
    return (
      <div >
		<h3>
		{this.state.t0} Registrar
		at {this.state.reg_addr}
		</h3>


		<Input labelPosition='right' type='text' placeholder=''>
		<input value={this_state['domain']} onChange={(text) => this_com.update_inputs('domain', text)} />
		<Label>.{this.state.t0}</Label>
		</Input>
		<br />

		<Button  onClick={(e) => this.call_fun('entries', e)}>entries</Button>

				<Grid columns='equal'>
					<Grid.Column>
		<List>

		{Object.keys(this.state.auction_st).map( (key) => (
			<List.Item key={'smt_id' + this.state.auction_st[key]}>


			{(this.state.auction_st_id == key)? <h4>{key}.{this.state.auction_st[key]}</h4>:this.state.auction_st[key]}

			</List.Item>
		))}
		</List>

					</Grid.Column>
					<Grid.Column>

				<Table>
				<Table.Body>

					<Table.Row>
						<Table.Cell >  Auction End Time</Table.Cell>
						<Table.Cell > {this.state.auction_end_time}</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell > Get Allowed Time</Table.Cell>
						<Table.Cell > {this.state.soft_date}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell >  Winning Bid</Table.Cell>
						<Table.Cell > {this.state.winning_bid}</Table.Cell>
					</Table.Row>


					<Table.Row>
						<Table.Cell >  Deed Address</Table.Cell>
						<Table.Cell > {this.state.deed_addr}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell >  Deed Owner</Table.Cell>
						<Table.Cell > {this.state.deed_owner}</Table.Cell>
					</Table.Row>

				</Table.Body>
				</Table>

					</Grid.Column>
				</Grid>


      </div>
    );
  }
}

export default Reg;


