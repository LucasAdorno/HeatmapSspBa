import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MapPage from '../pages/MapPage';

// import { Container } from './styles';

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/heatmap' component={MapPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;