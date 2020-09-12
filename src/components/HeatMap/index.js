import React, { useEffect, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import api from '../../services/api';

import { Container } from './styles';

function HeatMap() {

  const [addressPoints, setAddressPoints] = useState([]);
  const [neighborhood, setNeighborhood] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('heatmap').then(response => {
      let points = [];
      let filteredNeighborhood = [];
      setData(response.data);

      response.data.map(item => {
        item.city === 'Salvador' ? filteredNeighborhood.push(item.bairro) : filteredNeighborhood.push(item.city);
        return points.push([Number(item.latitude), Number(item.longitude)])
      })

      filteredNeighborhood = filteredNeighborhood.filter((item, index, self) => index === self.indexOf(item));
      filteredNeighborhood = filteredNeighborhood.filter(item => item !== 'NI');

      setAddressPoints(points);
      setNeighborhood(filteredNeighborhood.sort());

    })
  }, [])

  const HandleChangeSelect = e => {
    let filteredPoints = [];
    if (e.target.value === 'todos') {
      data.map(item =>
        filteredPoints.push([Number(item.latitude), Number(item.longitude)])
      )
    }

    else {
      data.map(item => 
         item.bairro === e.target.value || item.city === e.target.value ? filteredPoints.push([Number(item.latitude), Number(item.longitude)]) : 0
        )
    }
    setAddressPoints(filteredPoints)
    console.log(filteredPoints);
  }

  return (
    <Container>
      <select onChange={(e) => HandleChangeSelect(e)}>
        <option value={'todos'}> Todos </option>
        {neighborhood.map(item => <option key={item} value={item}> {item} </option>)}
      </select>
      <Map center={[-12.990226, -38.501322]} zoom={12} height={20}>
        <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={addressPoints}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => parseFloat(m[2])}
          radius={15} />
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    </Container>
  );
}

export default HeatMap;