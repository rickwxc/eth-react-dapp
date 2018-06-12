import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react'
import web3 from './web3obj';
import Node from './node';
import Ens from './ens';
import AuctionRegistrar from './auction_registrar';
import FifsRegistrar from './fifs_registrar';
import AuctionTopLevel from './ens_top_level_domain_auction'; 
import BetterAuctionFactory from './better_auction_factory'; 
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

/*
 *
					<FifsRegistrar t0='test'  network_id={this.state.network_id} />
					<AuctionRegistrar t0='eth'  network_id={this.state.network_id} />
					<AuctionTopLevel  network_id={this.state.network_id} />
 * */
//
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			network_id: false,
			network: '',
			isConnected: (web3.isConnected()? 'Yes':'No'),
			isMetaMask: (web3.currentProvider.isMetaMask? 'Yes':'No')
		};
	}
	componentDidMount() {

		if (web3.currentProvider.isMetaMask){
			web3.version.getNetwork((err, netId) => {
				this.setState({network_id : netId});
				if(netId == 1) {
					this.setState({network : 'MAIN NET'});
				}else if(netId == 3){
					this.setState({network : 'Ropsten'});
				}else if(netId == 4){
					this.setState({network : 'Rinkeby'});
				} 
			})






		}else{

		}

	}

  render() {
		if (!this.state.isMetaMask) {
			return (
				<div >
			Must use metamask to run.
				</div>
			);
		}
		if (this.state.network_id) {
			return (
				<Grid columns='equal'>
				<Grid.Column>
				Network: {this.state.network} 
				<br />
					<Node />
					<Ens network_id={this.state.network_id} />

					<BetterAuctionFactory network_id={this.state.network_id}  t0='eth' />

				</Grid.Column>
				</Grid>
			);
		}

		return (
			<Header as='h3' textAlign='center'>
			loading...
			</Header>
		);
  }
}

export default App;
