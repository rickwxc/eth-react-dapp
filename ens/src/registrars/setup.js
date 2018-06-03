import React, { Component } from 'react';
import fifs from './fifs';
import web3 from '../web3obj';

web3.version.getNetwork((err, netId) => {

	switch (netId) {
		case "1":
			break
		case "2":
			break
		case "3":
			break
		case "4":
			break
		case "42":
			break
		default:
			break
	}

})

//var ens = ensContract.at(ens_addr);
//
function namehash(name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name !== '') {
        var labels = name.split(".");
        for(var i = labels.length - 1; i >= 0; i--) {
            node = web3.sha3(node + web3.sha3(labels[i]).slice(2), {encoding: 'hex'});
        }
    }
    return node.toString();
}

class Registrars  extends Component {
	init(network_id){
		console.log(network_id)
	}
}

const rs = {}
export default Registrars;
