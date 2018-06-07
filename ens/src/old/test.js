import React, { Component } from 'react';
import web3 from './web3obj';
import { Header, Table, Input , Button, Label} from 'semantic-ui-react'

import {namehash} from './utils'
import fifs from './registrars/fifs';


class Test  extends Component {
	constructor(props) {
		super(props);

		this.state = {
			domain: 'myname',
			check: '',
			register: '',
			reg: false,
		};

		var this_c = this
		props.ens.owner(namehash('test'),function(e,r){
			this_c.setState({reg:web3.eth.contract(fifs['abi']).at(r)})
		})

	}

	call_fun(name) {
		var this_com = this;

		if(name == 'check'){
			this.state.reg.expiryTimes(web3.sha3(this.state.domain),function(e,r){
				var t = new Date(r.toNumber() * 1000)
				this_com.setState({'check': t.toString()});
			})
		}

		if(name == 'register'){

			this.state.reg.register(web3.sha3(this.state.domain), web3.eth.accounts[0], function(e,r){
				if(e){
					this_com.setState({'register': e.toString()});
					return;
				}
				this_com.setState({'register': 'http://rinkeby.etherscan.io/tx/'+r});
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
				  <Input type='text' placeholder=''>
				  <input value={this_state['domain']} onChange={(text) => this_com.update_inputs('domain', text)} />
				  </Input>
			  <br />
			  <Button onClick={(e) => this.call_fun('check', e)}>Query</Button>
			  </Table.Cell>
			  <Table.Cell>
			  {this.state.domain}
			  <br />
			  {this.state.check}
			  </Table.Cell>
						</Table.Row>
						<Table.Row>
			  <Table.Cell>
			  <h3>
			  FIFS 
			  </h3>
			  {this.state.domain}.test
			  <Button onClick={(e) => this.call_fun('register', e)}>Register</Button>
			  <br />

			  {this.state.register}

			  </Table.Cell>
			  <Table.Cell>
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

export default Test;

