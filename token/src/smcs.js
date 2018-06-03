import web3 from './web3obj';
import tokens from './sms/all';

var tks = {};
var contracts = {};
for(var idx in tokens){
	var tk = tokens[idx];
	var t = {
		code : tk.code,
		i : web3.eth.contract(tk.abi).at(tk.addr) 
	}

	if(tk.not_token){
		contracts[t.code] = t;
	}else{
		tks[t.code] = t;
	}
}

const contract_instances = {
	tokens : tks,
	contracts : contracts
}
export default contract_instances;
