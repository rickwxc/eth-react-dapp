import React, { Component } from 'react';
import web3 from './web3obj';
import ens from './smcs/ens';
import resolver from './smcs/public_resolver';

import { Header, Table, Input , Button, Label} from 'semantic-ui-react'
import {namehash} from './utils';


class Ens extends Component {
	constructor(props) {
		super(props);
		//console.log(web3.sha3("myname"))
		
		var e = web3.eth.contract(ens['abi']).at(ens['addrs'][props.network_id]);

		this.state = {
			domain: 'internet.eth',
			ens_addr: ens['addrs'][props.network_id],
			owner: '',
			resolver: '',
			rev_addr: '',
			network_id: props.network_id,
			rev: false,
			ens: e,
		};

		//e.setOwner('rkb', '0x20b84868f1ddcd3a35cbb9e21c7b28e73028a0e0', (e, r) => { })
		//0x724e1d1a634091f3abd7eaf39b8d82750a37c1a074372437bfa21db88593c15e

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

		if(name == 'owner'){
			this.state.ens.owner(namehash(this_state.domain), (e,r) =>{
				this_com.setState({owner:r});
			});
		}
		if(name == 'resolver'){
			this.state.ens.resolver(namehash(this_state.domain), (e,r) =>{
				this_com.setState({resolver:r});

				var rev = web3.eth.contract(resolver['abi']).at(r);
				this_com.setState({rev:rev});
				rev.addr(namehash(this_state.domain), function(e, r){
					this_com.setState({rev_addr:r});
				})
				
				rev.content(namehash(this_state.domain), function(e, r){
					this_com.setState({rev_content:r});
				})

			});
		}

	}

  render() {
			var this_com = this;
			var this_state = this.state;
    return (
      <div >
		<h2>
		Ens: {this.state.ens_addr}
		</h2>

		<Input defaultValue={this_state.domain}
		onChange={(text) => this_com.update_inputs('domain', text)}
		/>

		<Button   variant="outlined"  onClick={(e) => this.call_fun('owner', e)}>owner</Button>
		<Button   variant="outlined"  onClick={(e) => this.call_fun('resolver', e)}>resolver</Button>

		<br />
owner: {this.state.owner}
		<br />
resolver: {this.state.resolver}
<br />

resolved address: {this.state.rev_addr}
<br />
resolved rev_content: {this.state.rev_content}

      </div>
    );
  }
}

export default Ens;

