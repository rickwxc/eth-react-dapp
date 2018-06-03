import React, { Component } from 'react';
import ensobj from './ensobj';
import web3 from './web3obj';
import Test from './test';
import Resolver from './resolver';
import Auction from './auction';

class Registrars  extends Component {
	constructor(props) {
		super(props);

		var ens = web3.eth.contract(ensobj['abi']).at(ensobj['addr'][props.network_id]);

		this.state = {
			network_id: props.network_id,
			ens: ens,
		};

	}

  render() {
	  return(
		  <div>
		  <Test ens={this.state.ens} />
		  <Resolver ens={this.state.ens}  network_id={this.state.network_id}/>
		  <Auction ens={this.state.ens} />

		  </div>
	  
	  )
  }
}

export default Registrars;
