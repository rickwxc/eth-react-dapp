import React, { Component } from 'react';
import web3 from './web3obj';
import ens from './smcs/ens';

import better_auction from './smcs/better_auction';


import { Grid, List, Header, Table, Input , Button, Label} from 'semantic-ui-react'
import {namehash} from './utils';

class Reg extends Component {
	constructor(props) {
		super(props);
		
		var ba = web3.eth.contract(better_auction['abi']).at(props.better_auction_addr);
		this.state = {
			ba: ba,
			activated:'',
			trans:'',

			domain: 'myname',
			reg_addr: ba.address,
			expire_time: '',
			owner: '',
			resolver: '',
			t0: props.t0,
			network_id: props.network_id,
			numberOfDeployedAuctions:'',
			ensRegistrarAddr:'',
			auction_idx:0,
			auction_addr:'',
		};

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
		
		if(name == 'ENSName'){
			this.state.ba.ENSName((e, r)=>{
				this_com.setState({ENSName:r});
			});
		}

		if(name == 'activated'){
			this.state.ba.activated((e, r)=>{
				this_com.setState({activated:(r? 'Y':'N')});
			});
		}

		if(name == 'activate'){
			this.state.ba.activate({from:web3.eth.accounts[0] }, (e, r)=>{
				this_com.setState({trans:r});
			});
		}

		if(name == 'beneficiaryCloseAuction'){
			this.state.ba.beneficiaryCloseAuction({from:web3.eth.accounts[0] }, (e, r)=>{
				this_com.setState({trans:r});
			});
		}

		if(name == 'beneficiaryRecoverFunds'){
			this.state.ba.beneficiaryRecoverFunds({from:web3.eth.accounts[0] }, (e, r)=>{
				this_com.setState({trans:r});
			});
		}

		if(name == 'nonHighestBidderRefund'){
			this.state.ba.nonHighestBidderRefund({from:web3.eth.accounts[0] }, (e, r)=>{
				this_com.setState({trans:r});
			});
		}


		if(name == 'bidderPlaceBid'){
			this.state.ba.bidderPlaceBid({from:web3.eth.accounts[0] }, (e, r)=>{
				this_com.setState({trans:r});
			});
		}

		if(name == 'biddingPeriod'){
			this.state.ba.biddingPeriod((e, r)=>{
				this_com.setState({biddingPeriod:((r.toNumber()/3600) + ' hours')});
			});
		}

		if(name == 'highestBid'){
			this.state.ba.highestBid((e, r)=>{
				this_com.setState({highestBid:r.toNumber()});
			});
		}
		
		if(name == 'highestBidder'){
			this.state.ba.highestBidder((e, r)=>{
				this_com.setState({highestBidder:r});
				this_com.setState({bidder_addr:r});
			});
		}
		if(name == 'recoveryAfterPeriod'){
			this.state.ba.recoveryAfterPeriod((e, r)=>{
				this_com.setState({recoveryAfterPeriod:r.toNumber()});
			});
		}
		if(name == 'getBid'){
			this.state.ba.getBid(this.state.bidder_addr, (e, r)=>{
				this_com.setState({bidder_amount:web3.fromWei(r.toNumber(), 'ether')});
			});
		}


		if(name == 'WITHDRAWAL_TRIGGER_AMOUNT'){
			this.state.ba.WITHDRAWAL_TRIGGER_AMOUNT((e, r)=>{
				this_com.setState({WITHDRAWAL_TRIGGER_AMOUNT:r.toNumber()});
			});
		}

		if(name == 'beneficiary'){
			this.state.ba.beneficiary((e, r)=>{
				this_com.setState({beneficiary:r});
			});
		}

		if(name == 'auctionStart'){
			this.state.ba.auctionStart((e,r) =>{
				if(e){
					console.log(e);
					return;
				}
				var dt = new Date(r.toNumber() * 1000);
				this_com.setState({'auctionStart': dt.toString()});
			});
		}

		if(name == 'auctionEndTime'){
			this.state.ba.auctionEndTime((e,r) =>{
				if(e){
					console.log(e);
					return;
				}
				var rt = r.toNumber() * 1000
				var dt = new Date(rt);
				var now = (Date.now() - rt)? 'Finished':'Ongoing';//.getTime();


				this_com.setState({'auctionEndTime': dt.toString() + ' ' + now});
			});
		}

	}

  render() {
			var this_com = this;
			var this_state = this.state;
	  if(!this.state.ba){
		  return (
			  null
		  )
	  }
    return (
      <div >
		<h3> Better Auction at {this.state.reg_addr}</h3>

	<Table>
		<Table.Body>
			<Table.Row>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('ENSName', e)}>ENSName</Button>
				</Table.Cell>
				<Table.Cell >
					{this.state.ENSName}
				</Table.Cell>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('activated', e)}>Been activated?</Button>
				</Table.Cell>
				<Table.Cell >
					{this.state.activated}
				</Table.Cell>

			</Table.Row>
			<Table.Row>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('auctionStart', e)}>auctionStart</Button>
				</Table.Cell>
				<Table.Cell >
					{this.state.auctionStart}
				</Table.Cell>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('auctionEndTime', e)}>auctionEndTime</Button>
				</Table.Cell>
				<Table.Cell >
					{this.state.auctionEndTime}
				</Table.Cell>

			</Table.Row>

			<Table.Row>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('beneficiary', e)}>beneficiary</Button>
				</Table.Cell>
				<Table.Cell >
					{this.state.beneficiary}
				</Table.Cell>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('biddingPeriod', e)}>biddingPeriod</Button>
				</Table.Cell>
				<Table.Cell >
					{this.state.biddingPeriod}
				</Table.Cell>
			</Table.Row>

			<Table.Row>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('highestBid', e)}>highestBid</Button>
				</Table.Cell>
				<Table.Cell >
					{this.state.highestBid}
				</Table.Cell>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('highestBidder', e)}>highestBidder</Button>
				</Table.Cell>
				<Table.Cell >
					{this.state.highestBidder}
				</Table.Cell>
			</Table.Row>

			<Table.Row>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('recoveryAfterPeriod', e)}>recoveryAfterPeriod</Button>
				</Table.Cell>
				<Table.Cell >
					{this.state.recoveryAfterPeriod}
				</Table.Cell>
				<Table.Cell >
		<Button  onClick={(e) => this.call_fun('WITHDRAWAL_TRIGGER_AMOUNT', e)}>WITHDRAWAL_TRIGGER_AMOUNT</Button>
				</Table.Cell>
				<Table.Cell >
					{this.state.WITHDRAWAL_TRIGGER_AMOUNT}
				</Table.Cell>
			</Table.Row>

			<Table.Row>
				<Table.Cell >

		<Input type='text' placeholder=''>
		<input value={this_state.bidder_addr} onChange={(text) => this_com.update_inputs('bidder_addr', text)} />
		</Input>
		<br />
		<Button  onClick={(e) => this.call_fun('getBid', e)}>getBid</Button>
				</Table.Cell>
				<Table.Cell >

				</Table.Cell>
				<Table.Cell >
				</Table.Cell>
				<Table.Cell >
					{this.state.bidder_amount}
				</Table.Cell>
			</Table.Row>

			<Table.Row>
				<Table.Cell >
			
		<Button  primary onClick={(e) => this.call_fun('activate', e)}>activate</Button>
				</Table.Cell>
				<Table.Cell >
		<Button primary  onClick={(e) => this.call_fun('beneficiaryCloseAuction', e)}>beneficiaryCloseAuction</Button>
				</Table.Cell>
				<Table.Cell >
		<Button  primary onClick={(e) => this.call_fun('beneficiaryRecoverFunds', e)}>beneficiaryRecoverFunds</Button>

				</Table.Cell>
				<Table.Cell >
		<Button  primary onClick={(e) => this.call_fun('nonHighestBidderRefund', e)}>nonHighestBidderRefund</Button>
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell colspan="4">
		<Button primary  onClick={(e) => this.call_fun('bidderPlaceBid', e)}>bidderPlaceBid</Button>
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell colspan="4">
				Transaction Hash: {this.state.trans}
				</Table.Cell>
			</Table.Row>






		</Table.Body>
	</Table>



      </div>
    );
  }
}

export default Reg;


