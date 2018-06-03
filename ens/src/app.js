import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react'
import web3 from './web3obj';
//import myens from './myens';
//import registrars from './registrars/setup';
import Registrars from './registrars';
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			network_id: false,
			isConnected: (web3.isConnected()? 'Yes':'No'),
			isMetaMask: (web3.currentProvider.isMetaMask? 'Yes':'No')
		};
	}
	componentDidMount() {

		if (web3.currentProvider.isMetaMask){
			web3.version.getNetwork((err, netId) => {
				this.setState({network_id : netId});
				//registrars.init(netId);
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
				<Registrars network_id={this.state.network_id}/>
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
