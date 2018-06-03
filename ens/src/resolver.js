import React, { Component } from 'react';
import web3 from './web3obj';
import { Header, Table, Input , Button, Label} from 'semantic-ui-react'

import {namehash} from './utils'
import resolver from './registrars/resolver';


class Resolver  extends Component {
	constructor(props) {
		super(props);

		this.state = {
			domain: 'myname.test',
			rev_addr: '',
			owner_addr: '',
			domain_content: '',
			ens: props.ens,
			resolver: web3.eth.contract(resolver.abi),
			reg: false,
		};

	}

	getAddr(name) {
		var node = namehash(name)
		var this_state = this.state;
		var this_c = this;
		this.state.ens.resolver(node, function(e, resolverAddress){
			if(e){
				console.log(e);
				return;
			}
			this_c.setState({rev_addr:resolverAddress});

			if (resolverAddress === '0x0000000000000000000000000000000000000000') {
				return resolverAddress;
			}

			this_state.resolver.at(resolverAddress).addr(node, function(e, r){
				if(e){
					console.log(e);
					return;
				}
				this_c.setState({owner_addr:r});
			});

		});
	}

	getContent(name) {
		var node = namehash(name)
		var this_state = this.state;
		var this_c = this;
		this.state.ens.resolver(node, function(e, resolverAddress){
			if(e){
				console.log(e);
				return;
			}
			if (resolverAddress === '0x0000000000000000000000000000000000000000') {
				return "0x0000000000000000000000000000000000000000000000000000000000000000";
			}

			this_state.resolver.at(resolverAddress).content(node, function(e, r){
				this_c.setState({domain_content:r});
			});

		});
	}

	call_fun(name) {
		var this_com = this;

		if(name == 'check'){
			this.getAddr(this.state.domain);
			this.getContent(this.state.domain);
		}

	}

	update_inputs(idx, e) {
		var val = e.target.value
		var o = this.state
		o[idx] = val;
		this.setState(o);
	}

  render() {
			var this_com = this;
			var this_state = this.state;

		  return(
				<Table>
				<Table.Body>
						<Table.Row>
        <Table.Cell >
			  <h3>
			  Resovler
			  </h3>
				  <Input  type='text' placeholder=''>
				  <input value={this_state['domain']} onChange={(text) => this_com.update_inputs('domain', text)} />
				  </Input>
			  <br />
			  <Button onClick={(e) => this.call_fun('check', e)}>resolve</Button>
			  </Table.Cell>
			  <Table.Cell>

			  {this.state.domain}
			  <br />
			  Resolver Address:
			  {this.state.rev_addr}

			  <br />
			  Owner Address:
			  {this.state.owner_addr}
			  <br />
			  Content:
			  {this.state.domain_content}


			  </Table.Cell>
						</Table.Row>
				</Table.Body>
				</Table>
		  )
  }
}

export default Resolver;

