var ENS = require('ethereum-ens');
//var Web3 = require('web3');
var web3 = window.web3; // use metamask

//var provider = new Web3.providers.HttpProvider();
var ens = new ENS(web3.currentProvider);



		try {
			//ens.resolver('foo.eth')
		} catch (e) {

		}

			var rs = null;
//ens.resolver('test')

/*
rs = ens.resolver('myname.eth').then(function(e){
})
	.catch(err => {
		console.error(err);
		return err;
	})
	.then(ok => {
		console.log(ok.message)
	});
*/
if (rs){
	/*
	rs.addr().then(function(addr) { 
		console.log(addr)
	});
	*/

}
/*
var address = ens.resolver('hereismyname.test').addr().then(function(addr) { 
	console.log(addr)
	
	
	});
*/
