import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet's default CSS
import L from "leaflet";

const userIcon = new L.Icon({
  
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = ({ className }) => {
  const  defaultPosition = [16.5449, 81.5212]; // Bhimavaram's coordinates
  const [userPosition, setUserPosition] = useState(null); 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.error("Location error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <MapContainer
      center={userPosition || defaultPosition}
      zoom={13}
      className={`w-full h-[400px] rounded-xl border border-border bg-card ${className}`}
    >
      {/* OpenStreetMap Tile Layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Marker at Bhimavaram */}
      {userPosition && (
        <Marker position={userPosition} >
          <Popup>Your Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
