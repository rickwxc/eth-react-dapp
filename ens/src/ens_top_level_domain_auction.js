import React, { Component } from 'react';
import web3 from './web3obj';
import { Header, Table, Input , Button, Label} from 'semantic-ui-react'

import ens from './smcs/ens';
import {namehash} from './utils'
import auction from './old/registrars/auction';
import deed from './old/registrars/deed';
import { List } from 'semantic-ui-react'



class Auction  extends Component {
	constructor(props) {
		super(props);

		this.state = {
			domain: 'myname',
			check: '',
			tx: '',
			final_tx: '',
			bid_tx: '',
			bid_amt: '0.0001',
			winning_bid: '',

			bid_secret: 'secret',
			bid_amt_fake: '0.5',
			auction_st_id: '',
			deed_addr: '',
			soft_date: '',
			auction_end_time: '',
			auction_st: {
				0:"Name is available and the auction hasn’t started",
				1:' Name is available and the auction has been started',
				2:' Name is taken and currently owned by someone',
				3:'Name is forbidden',
				4:'Name is currently in the ‘reveal’ stage of the auction',
				5:'Name is not yet available due to the ‘soft launch’ of names.',
			},
			reg: false,
		};

		var e = web3.eth.contract(ens['abi']).at(ens['addrs'][props.network_id]);

		var this_c = this
		e.owner(namehash('eth'),function(e,r){
			this_c.setState({reg:web3.eth.contract(auction['abi']).at(r)})
		})

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

		//new Date(ethRegistrar.getAllowedTime(web3.sha3('name')) * 1000);
	}


	call_fun(name) {
		var this_com = this;

		if(name == 'check'){
				this_com.setState({'auction_st_id': ''});
			this.state.reg.entries(web3.sha3(this.state.domain), (e, r) => {
				if(e){
					return;
				}
				var ast_id = r[0].toNumber();
				this_com.setState({'auction_st_id': ast_id});
				if(ast_id == 5){
					this_com.load_soft_date();
				}

				var dt = new Date(r[2].toNumber() * 1000);
				this_com.setState({'auction_end_time': dt.toString()});
				if(ast_id == 1){
				}
				var winning_bid = web3.fromWei(r[4], 'ether');
				this_com.setState({'winning_bid': winning_bid.toNumber()});

				var deed_addr = r[1]; 
				console.log(r);
				//deedContract.at([1]).owner();
				this_com.setState({'deed_addr': deed_addr});

				if(deed_addr != "0x0000000000000000000000000000000000000000"){
					web3.eth.contract(deed['abi']).at(deed_addr).owner((e, r) => {
						//console.log(r);
					})

				}


			});
		}
		if(name == 'bid'){
				this.state.reg.shaBid(web3.sha3(this.state.domain), web3.eth.accounts[0], web3.toWei(this.state.bid_amt, 'ether'), web3.sha3(this.state.bid_secret), (e, bid) =>{
					this_com.state.reg.newBid(bid, {from: web3.eth.accounts[0], value: web3.toWei(this_com.state.bid_amt_fake, 'ether')}, (e, r) =>{
						this_com.setState({'bid_tx': r});
					});
				});
		}
		if(name == 'unsealBid'){
		//ethRegistrar.unsealBid(web3.sha3('name'), web3.toWei(1, 'ether'), web3.sha3('secret'), {from: eth.accounts[0], gas: 500000});
				this.state.reg.unsealBid(web3.sha3(this.state.domain), web3.toWei(this.state.bid_amt, 'ether'), web3.sha3(this.state.bid_secret), (e, r) =>{
					this_com.setState({'bid_tx': r});
				})

		}
		if(name == 'auction_done'){
				this.state.reg.finalizeAuction(web3.sha3(this.state.domain), {from: web3.eth.accounts[0], gas: 500000},  (e, r) =>{
					this_com.setState({'final_tx': r});
				});

		}


		if(name == 'start_auction'){
			this_com.setState({'tx': ''});
			this.state.reg.startAuction(web3.sha3(this.state.domain), {from:web3.eth.accounts[0]}, function(e,r){
				if(e){
					//this_com.setState({'register': e.toString()});
					return;
				}
				this_com.setState({'tx': r});
			});

		}


	}

	update_inputs(idx, e) {
		var val = e.target.value
		var o = this.state
		o[idx] = val;
		this.setState(o);
	}

  render() {
	  if(this.state.reg){
			var this_com = this;
			var this_state = this.state;

		  return(
				<Table>
				<Table.Body>
						<Table.Row>
        <Table.Cell >
			  <h3>
			  Auction
			  </h3>
				  <Input labelPosition='right' type='text' placeholder=''>
				  <input value={this_state['domain']} onChange={(text) => this_com.update_inputs('domain', text)} />
				  <Label>.eth</Label>
				  </Input>
			  <br />
			  <Button onClick={(e) => this.call_fun('check', e)}>check</Button>
			  </Table.Cell>
			  <Table.Cell>
			  {this.state.domain}.eth
			  <br />

			  <List>

				{Object.keys(this.state.auction_st).map( (key) => (
					    <List.Item key={'smt_id' + this.state.auction_st[key]}>

					
			  {(this.state.auction_st_id == key)? <h4>{key}.{this.state.auction_st[key]}</h4>:this.state.auction_st[key]}
					
					</List.Item>
				))}
</List>

	<br />
	{this.state.soft_date != ''? 'Soft Launch Date:'+this.state.soft_date :''}
	<br />

	{this.state.auction_end_time != ''? 'Auction End Date:'+this.state.auction_end_time :''}
	<br />
	{this.state.deed_addr != ''? 'Deed Address:'+this.state.deed_addr :''}
	<br />
	{this.state.winning_bid != ''? 'Winning Bid:'+this.state.winning_bid :''}


			  </Table.Cell>
						</Table.Row>
						<Table.Row>
			  <Table.Cell>
			  
			  <Button onClick={(e) => this.call_fun('start_auction', e)}>Start Auction: {this.state.domain}.eth</Button>
			  </Table.Cell>
			  <Table.Cell>
			  {this.state.tx}
			  </Table.Cell>
						</Table.Row>
						<Table.Row>
			  <Table.Cell>
			  <h3>
			  Bid
			  </h3>

				  <Input labelPosition='right' type='text' placeholder=''>
				  <Label>Real Bid</Label>
				  <input value={this_state['bid_amt']} onChange={(text) => this_com.update_inputs('bid_amt', text)} />
				  <Label>eth</Label>
				  </Input>
			  <br />

				  <Input labelPosition='right' type='text' placeholder=''>
				  <Label>Disguise Bid</Label>
				  <input value={this_state['bid_amt_fake']} onChange={(text) => this_com.update_inputs('bid_amt_fake', text)} />
				  <Label>eth</Label>
				  </Input>
			  <br />

				  <Input type='text' placeholder='secret'>
				  <input value={this_state['bid_secret']} onChange={(text) => this_com.update_inputs('bid_secret', text)} />
				  </Input>
			  <br />


			  <Button onClick={(e) => this.call_fun('bid', e)}>Place Bid: {this.state.domain}, {this.state.bid_amt} ether, </Button>
			  <Button onClick={(e) => this.call_fun('unsealBid', e)}>Unseal Bid: {this.state.domain}, {this.state.bid_amt} ether, </Button>


			  </Table.Cell>
			  <Table.Cell>
			  {this.state.bid_tx}

			  </Table.Cell>

						</Table.Row>
						<Table.Row>


			  <Table.Cell>
			  <Button onClick={(e) => this.call_fun('auction_done', e)}>Finalize Auction: {this.state.domain} </Button>

			  </Table.Cell>
			  <Table.Cell>

			  {this.state.final_tx}
			  </Table.Cell>

						</Table.Row>
				</Table.Body>
				</Table>
		  )
	  
	  }
	  return(
		  <div>
		  loading...
		  </div>
	  
	  )
  }
}

export default Auction;

