import web3 from './web3obj';
import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react'


class Sys extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isConnected: (web3.isConnected()? 'Yes':'No'),
			isMetaMask: (web3.currentProvider.isMetaMask? 'Yes':'No')
		};
	}


	componentDidMount() {

		if (web3.currentProvider.isMetaMask){
		web3.version.getNetwork((err, netId) => {
			var x = '';

			switch (netId) {
				case "1":
					x = 'main net';
					break
				case "2":
					x = 'deprecated Morden test net';
					break
				case "3":
					x = 'Ropsten test net';
					break
				case "4":
					x = 'Rinkeby test net';
					break
				case "42":
					x = 'Kovan test net';
					break
				default:
					x = 'unknown: ' + netId;
			}

			this.setState({network: x});
		})
		}else{
			this.setState({network: web3.currentProvider.host});
		}

	}

  render() {
		if (this.state) {
			return (
	 <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Y/N</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row >
        <Table.Cell >isConnected</Table.Cell>
        <Table.Cell >{this.state.isConnected}</Table.Cell>
      </Table.Row>
      <Table.Row >
        <Table.Cell >isMetaMask</Table.Cell>
        <Table.Cell >{this.state.isMetaMask}</Table.Cell>
      </Table.Row>
      <Table.Row >
        <Table.Cell >Network</Table.Cell>
        <Table.Cell >{this.state.network}</Table.Cell>
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

export default Sys;


