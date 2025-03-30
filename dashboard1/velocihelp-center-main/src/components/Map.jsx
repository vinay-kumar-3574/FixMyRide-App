import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ markers = [], onMarkerClick }) => {
  // Default center (Bhimavaram)
  const center = [16.5449, 81.5212];

  return (
    <MapContainer center={center} zoom={15} style={{ width: '100%', height: '400px' }}>
      {/* OpenStreetMap Tile Layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Markers */}
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          eventHandlers={{
            click: () => onMarkerClick && onMarkerClick(marker),
          }}
        >
          <Popup>{marker.title || 'Marker'}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
