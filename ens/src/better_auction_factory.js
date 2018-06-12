import React, { Component } from 'react';
import web3 from './web3obj';
import ens from './smcs/ens';

import better_auction_factory from './smcs/better_auction_factory';
import BetterAuction from './better_auction';


import { Grid, List, Header, Table, Input , Button, Label} from 'semantic-ui-react'
import {namehash} from './utils';

class Reg extends Component {
	constructor(props) {
		super(props);
		
		var bafactory = web3.eth.contract(better_auction_factory['abi']).at(better_auction_factory['addrs'][props.network_id]);
		this.state = {
			domain: 'myname',
			reg_addr: bafactory.address,
			expire_time: '',
			owner: '',
			resolver: '',
			t0: props.t0,
			network_id: props.network_id,
			bafactory: bafactory,
			numberOfDeployedAuctions:'',
			ensRegistrarAddr:'',
			auction_idx:0,
			better_auction_addr:'',
		};

		/*
		var this_c = this
		e.owner(namehash(props.t0),function(e,r){

			if(r != '0x0000000000000000000000000000000000000000'){
				this_c.setState({reg_addr:r})
				this_c.setState({reg:web3.eth.contract(registrar['abi']).at(r)})
			}
		})
		*/
		//

		

	}
	update_inputs(idx, e) {
		var val = e.target.value
		var o = this.state
		o[idx] = val;
		this.setState(o);
	}

	call_fun(name) {
		var this_com = this;
		var this_state = this.state;
		
		if(name == 'numberOfDeployedAuctions'){
			this.state.bafactory.numberOfDeployedAuctions((e, r)=>{
				this_com.setState({numberOfDeployedAuctions:r.toNumber()});
			});
		
		}

		if(name == 'ensRegistrarAddr'){
			this.state.bafactory.ensRegistrarAddr((e, r)=>{
				this_com.setState({ensRegistrarAddr:r});
			});
		
		}


		if(name == 'getAuctionAddress'){
			this.state.bafactory.getAuction(this.state.auction_idx,(e, r)=>{
				this_com.setState({better_auction_addr:r});
			});
		
		}

		if(name == 'expiryTimes'){
			this_com.setState({'auction_st_id': ''});
			this.state.reg.expiryTimes(web3.sha3(this_state.domain), (e,r) =>{
				if(e){
					console.log(e);
					return;
				}
				var dt = new Date(r.toNumber() * 1000);
				this_com.setState({'expire_time': dt.toString()});
			});
		}

	}

  render() {
			var this_com = this;
			var this_state = this.state;
	  if(!this.state.bafactory){
		  return (
			  null
		  )
	  }
    return (
      <div >
		<h3> Better A Factory at {this.state.reg_addr}</h3>

	<Table>
		<Table.Body>
			<Table.Row>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('numberOfDeployedAuctions', e)}>numberOfDeployedAuctions</Button>
				</Table.Cell>
				<Table.Cell >
					{this.state.numberOfDeployedAuctions}
				</Table.Cell>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('ensRegistrarAddr', e)}>ensRegistrarAddr</Button>
				</Table.Cell>
				<Table.Cell >
		{this.state.ensRegistrarAddr}
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell colSpan='2' >
		<Input type='text' placeholder=''>
		<input value={this_state.auction_idx} onChange={(text) => this_com.update_inputs('auction_idx', text)} />
		</Input>
		<Button  onClick={(e) => this.call_fun('getAuctionAddress', e)}>getAuctionAddress</Button>
				</Table.Cell>
				<Table.Cell colSpan='2' >
			{this.state.better_auction_addr}
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table>
		<br />
		{this.state.better_auction_addr && this.state.better_auction_addr != '0x'? <BetterAuction better_auction_addr={this.state.better_auction_addr} />:''}


      </div>
    );
  }
}

export default Reg;

