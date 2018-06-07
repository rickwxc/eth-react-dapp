import React, { Component } from 'react';
import web3 from './web3obj';
import ens from './smcs/ens';

import registrar from './smcs/fifs_registrar';

import { Grid, List, Header, Table, Input , Button, Label} from 'semantic-ui-react'
import {namehash} from './utils';

class Reg extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			domain: 'myname',
			reg_addr: '',
			expire_time: '',
			owner: '',
			resolver: '',
			t0: props.t0,
			network_id: props.network_id,
			reg: false,
		};

		var e = web3.eth.contract(ens['abi']).at(ens['addrs'][props.network_id]);

		var this_c = this
		e.owner(namehash(props.t0),function(e,r){

			if(r != '0x0000000000000000000000000000000000000000'){
				this_c.setState({reg_addr:r})
				this_c.setState({reg:web3.eth.contract(registrar['abi']).at(r)})
			}
		})

		

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
	  if(!this.state.reg_addr){
		  return (
			  null
		  )
	  }
    return (
      <div >
		<h3>
		{this.state.t0} FIFS Registrar at {this.state.reg_addr}
		</h3>


		<Input labelPosition='right' type='text' placeholder=''>
		<input value={this_state['domain']} onChange={(text) => this_com.update_inputs('domain', text)} />
		<Label>.{this.state.t0}</Label>
		</Input>
		<br />

		<Button  onClick={(e) => this.call_fun('expiryTimes', e)}>expiryTimes</Button>

		<br />
		Expire  Time: {this.state.expire_time}

      </div>
    );
  }
}

export default Reg;
