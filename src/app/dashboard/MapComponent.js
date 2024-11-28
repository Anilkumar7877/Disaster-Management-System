import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Utility to determine dot color by magnitude
const getColorByMagnitude = (magnitude) => {
    if (magnitude === null || isNaN(magnitude)) return "gray";
    if (magnitude <= 2) return "green";
    if (magnitude <= 4) return "yellow";
    if (magnitude <= 7.1) return "orange";
    return "red";
};

const createDotIcon = (magnitude) => {
    const color = getColorByMagnitude(magnitude);
    return L.divIcon({
        className: "custom-dot-icon",
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
    });
};

const MapWithMarkers = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/getLocations");
                setLocations(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div>
            <MapContainer center={[36.2048, 138.2529]} zoom={5} style={{ height: "525px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[location.latitude, location.longitude]}
                        icon={createDotIcon(location.mag)}
                    >
                        <Popup>
                            <strong>Location:</strong> {location.location} <br />
                            <strong>Country:</strong> {location.country} <br />
                            <strong>Magnitude:</strong> {location.mag} <br />
                            <strong>Count:</strong> {location.count}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapWithMarkers;
