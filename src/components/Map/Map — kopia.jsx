import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import CanvasJSReact from '../../assets/canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title:{
        text: "Simple Column Chart with Index Labels"
    },
    axisY: {
        includeZero: true
    },
    data: [{
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: [
            { x: 10, y: 71 },
            { x: 20, y: 55 },
            { x: 30, y: 50 },
            { x: 40, y: 65 },
            { x: 50, y: 71 },
            { x: 60, y: 68 },
            { x: 70, y: 38 },
            { x: 80, y: 92, indexLabel: "Highest" },
            { x: 90, y: 54 },
            { x: 100, y: 60 },
            { x: 110, y: 21 },
            { x: 120, y: 49 },
            { x: 130, y: 36 }
        ]
    }]
}


export default function Map() {

    const position = [50.0468548, 19.9348336];
    return (
        <LeafletMap center={position} zoom={15}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup minWidth="800">
                    <CanvasJSChart options = {options} />
                </Popup>
                </Marker>
        </LeafletMap>
    );
};