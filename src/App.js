import React, { Component } from 'react';
import Accs from './accs';
import Contracts from './contracts';
import Sys from './sys';

import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


class App extends Component {
  render() {

	  
    return (
  <Grid columns='equal'>
    <Grid.Column>
		<Sys />
		<Accs />
		<Contracts />
    </Grid.Column>
  </Grid>
    );
  }
}

export default App;
