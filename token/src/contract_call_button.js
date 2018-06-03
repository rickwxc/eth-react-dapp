
import web3 from './web3obj';
import React, { Component } from 'react';
import { Header, Table, Input , Button, Label} from 'semantic-ui-react'

function timestampToStr(timestamp) {  
  var timestamp1 = new Date(timestamp*1000);
  var dateStr = timestamp1.toLocaleString();
  return dateStr;
}

class Contractcallbutton extends Component {
	constructor(props) {
		super(props);
		var inputs = {};
		var outputs = {};

		props.fun.inputs.map(function (item, idx) {
			inputs[idx] = '';
		})

		props.fun.outputs.map(function (item, idx) {
			outputs[idx] = '';
		})

		this.state = {
			name: props.fun.name,
			sminst: props.sminst,
			fun: props.fun,
			outputs: outputs,
			inputs: inputs,
			trans_hash: '',
			is_success: false,
			is_view_only: props.fun.stateMutability == 'view',
			data: false
		};

	}

	componentDidMount() {

	}

	update_inputs(idx, e) {
		var  val = e.target.value
		var inputs = (this.state.inputs);
		inputs[idx] = val;
		this.setState({inputs: inputs});
	}

	cb(this_st, e,r) {
		if(e){
			console.log(e)
			this.setState({trans_hash: 'Error', is_success: false});
			return;
		}
		console.log(r)
		this.setState({is_success: true, trans_hash: ''});
		if(!this_st.state.is_view_only){
			this.setState({trans_hash: r});
			return;
		}

		var outputs = {}
		this_st.state.fun.outputs.map(function (item, idx) {
			var opt = r
			if(this_st.state.fun.outputs.length != 1) {
				 opt = r[idx]
			}
			if(item.name.match(/Time/g)){
				opt = timestampToStr(opt.toNumber());
			}else if(item.type.match(/\[\]/g)){
				if(item.type.match(/address/g)){
					var va = [];
					opt.map(function (addr) {
						if(addr != '0x0000000000000000000000000000000000000000'){
							va.push(addr);
						}
					})
					opt = va.join(', ');
				}
			}else if(item.type.match(/int/g)){
				opt = opt.toNumber();
			}else if(item.type.match(/bytes/g)){
				opt = web3.toAscii(opt);
			}else if(item.type == 'bool'){
				opt = opt? 'True':'False';

			}
			outputs[idx] = opt;
		})
		this.setState({outputs: outputs});
	}

	call_fun(name) {
		var outputs = [];
		var this_st = this;

		var args = [];

		Object.keys(this.state.inputs).map((key) =>{
			var ipt_type = this.state.fun.inputs[key].type;
			var ipt = this.state.inputs[key];
			if(ipt_type.match(/\[\]/g)){
				//is array
				var iptary = ipt.split(',');
				var a = [];
				iptary.map(function (addr, idx) {
					a.push("'" + addr + "'");
				})
				args.push("[" + a.join(',') + "]");
			}else if(ipt_type == 'string' || ipt_type == 'address'){
				args.push("'" + ipt + "'");
			}else if( ipt_type == 'bytes32' ){
				args.push("'" + web3.fromAscii(ipt) + "'");
			}else{
				args.push(ipt);
			}
		})

		var sa = '';
		if(args.length != 0){
			sa = args.join(',') +  ', ';
		}

		var send = '';
		if (!this.state.is_view_only || !web3.currentProvider.isMetaMask){
			send = ' {from: "'+web3.eth.accounts[0] +'", gas:4000000}, ';
		}
		
		var s = ('this.state.sminst[name]( ' + sa + send + ' function(e, r){ this_st.cb(this_st, e, r) });');
		try {
			eval(s);
		} catch (e) {
			this.setState({is_success:false, trans_hash: 'Error'});

		}
	}

	render() {
		if (this.state.name) {
			var this_state = this.state;
			var this_com = this;

			return (
				<Table>
				<Table.Body>
				{(this.state.fun.inputs.length > 0 )?
					<Table.Row positive>
						<Table.Cell colSpan='2'>  
						Inputs
						</Table.Cell >  
						</Table.Row>
						:(null)
				}
				{this.state.fun.inputs.map(function (item, idx) {
					return (
						<Table.Row key={'acc_id_abi' + idx}>
							<Table.Cell >  
								<Input labelPosition='right' type='text' placeholder=''>
									<Label basic>{item.name}</Label>
									<input value={this_state.inputs[idx]}
						          onChange={(text) => this_com.update_inputs(idx, text)} />
									<Label>{item.type}</Label>
								</Input>
							</Table.Cell >  
						</Table.Row>
					)
				})}
				{(this.state.fun.outputs.length > 0 )?
						<Table.Row positive>
				<Table.Cell colSpan='2'>  
				Outputs
				</Table.Cell >  
						</Table.Row>
						:(null)
				}

				{this.state.fun.outputs.map(function (item, idx) {
					return (
						<Table.Row key={'acc_id_abi' + idx}>
							<Table.Cell >  
								{item.name}
									({item.type})
							</Table.Cell >  
							<Table.Cell >  
								{this_state.outputs[idx]}
							</Table.Cell >  
						</Table.Row>
					)
				})}

				<Table.Row key={'acc_id_abi_btn'}>
					<Table.Cell colSpan='2'>  
				{this.state.is_view_only?
				
					<Button onClick={(e) => this.call_fun(this.state.fun.name, e)}>Call</Button>
					:
					<Button onClick={(e) => this.call_fun(this.state.fun.name, e)}>Send</Button>
				}

				{(this.state.is_success && this.state.trans_hash)?  "Success:":"" }
					
				{web3.currentProvider.isMetaMask && this.state.is_success && this.state.trans_hash != '' && this.state.trans_hash != 'Error'?
					<a href={"https://rinkeby.etherscan.io/tx/"+this.state.trans_hash}>https://rinkeby.etherscan.io/tx/{this.state.trans_hash}</a>:this.state.trans_hash
				}

				</Table.Cell>
				</Table.Row>

				</Table.Body>
				</Table>
			)
		}

		return (
			<Header as='h3' textAlign='center'>
			Loading ....
			</Header>
		);

	}

}



export default Contractcallbutton;
