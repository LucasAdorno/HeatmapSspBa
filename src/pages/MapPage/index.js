import React from 'react';
import HeatMap from '../../components/HeatMap';
import Header from '../../components/Header';

// import { Container } from './styles';

function MapPage() {
	return (
		<>
			<Header title='Mapa de calor' />
			<HeatMap />
		</>
	);
}

export default MapPage;