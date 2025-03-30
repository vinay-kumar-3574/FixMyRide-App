import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@mui/material";

export default function MapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { latitude, longitude } = location.state ;
  console.log("Received Location:", latitude, longitude); // Default: India

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <Button
        variant="contained"
        onClick={() => navigate("/dashboard")} 
        style={{ margin: "10px", alignSelf: "start" }}
      >
        Back
      </Button>
      <MapContainer center={[latitude, longitude]} zoom={15} style={{ flex: 1 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]}>
          <Popup>You are here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
