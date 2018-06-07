//import web3 from './web3obj';
const ENS = require('ethjs-ens')
const HttpProvider = require('ethjs-provider-http')
var web3 = window.web3; // use metamask

// For MetaMask or Mist compatibility:
if (typeof window === 'object' && typeof window.web3 !== 'undefined') {
  setupEns(web3.currentProvider)
} else {
  const provider = new HttpProvider('https://ropsten.infura.io')
  setupEns(provider)
}
//setupEns(web3.currentProvider)

function setupEns (provider) {

  // Currently requires both provider and
  // either a network or registryAddress param
  const ens = new ENS({ provider, network: '3' })

  ens.lookup('vitalik.eth', function(e,r){
  
  })
	/*
  ens.lookup('vitalik.eth')
  .then((address) => {
    const expected = '0x5f8f68a0d1cbc75f6ef764a44619277092c32df0'

    if (address === expected) {
      alert("That's how you do it!")
    }
  })
  .catch((reason) => {
    // There was an issue!
    // Maybe the name wasn't registered!
    console.error(reason)
  })
	*/
}
