import React, { Component } from 'react';
import web3 from './web3obj';

import { Header, Table, Input , Button, Label} from 'semantic-ui-react'
import {namehash} from './utils';


class Node extends Component {
	constructor(props) {
		super(props);
		//console.log(web3.sha3("myname"))
		
		this.state = {
			domain: 'myname.eth',
			node: '',
			hash: '',
		}

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

		if(name == 'node'){
			this.setState({node:namehash(this_state.domain)});
		}
		if(name == 'hash'){
			this.setState({hash:web3.sha3(this_state.domain)});
		}
	}

  render() {
			var this_com = this;
			var this_state = this.state;
    return (
      <div >
		<Input defaultValue={this_state.domain}
		onChange={(text) => this_com.update_inputs('domain', text)}
		/>

		<Button   variant="outlined"  onClick={(e) => this.call_fun('node', e)}>Node</Button>
		<Button   variant="outlined"  onClick={(e) => this.call_fun('hash', e)}>Hash</Button>
		<br />
		Node: {this_state.node}
		<br />
		Hash: {this_state.hash}




      </div>
    );
  }
}

export default Node;
