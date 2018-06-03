import web3 from './web3obj';
var ens_addr = null;

//ens
var ens = ensContract.at(ens_addr);
//var auction	
//var ethRegistrar = null;
ens.owner(namehash('eth'),function(e,r){
	ethRegistrar = auctionRegistrarContract.at(r);
})

//var deed
//var fifsRegistrarContract

//abi resover
var publicResolver = resolverContract.at('0x4c641fb9bad9b60ef180c31f56051ce826d21a9a');


//reverse
var reverseRegistrar = null;
ens.owner(namehash('addr.reverse'), function(e,r){
	reverseRegistrar = reverseRegistrarContract.at(r);
})




const regs = {
	test:testRegistrar
}
export default regs;

