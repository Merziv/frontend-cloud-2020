import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import CanvasJSReact from '../../assets/canvasjs.react';

import '../../style.css';

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
};

class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoaded: false
        }
    }

    componentDidMount(){
        fetch('/sensors/check')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    data: json.result
                });
                console.log(this.state.data);
            });
    }

    render(){
        // const positions = [50.0468548, 19.9348336];
        let {isLoaded, data} = this.state;

        if (!isLoaded){
            return <div>Loading...</div>
        }
        // data = this.state.data.map((item) => {return console.log(item.localization[1])})

        // data = this.state.data.map((item) => {
        //     let position = [item.localization[0], item.localization[1]];
        //     console.log(position);
        // });

        // const position = [50.0468548, 19.9348336];
        const position = [50.0668858, 19.9135305];

        data = data.map((item, idx) => {
            let d = (item.date).split('T');
            let day = d[0];
            let hour = d[1].split('.');
            hour = hour[0];

            let col;

            if (item.avg_speed > 40){
                col = "green";
            }
            else if (item.avg_speed <= 40 && item.avg_speed >25){
                col = "yellow";
            }
            else
                col = "red";

            return(
                <Marker key={`marker-${idx}`} position={item.localization}>
                    <Popup minHeight="100" minWidth="300">
                        {/*<span>A pretty CSS3 popup. <br/> Easily customizable.</span>*/}
                        <table>
                            <tr>
                                <td>Sensor_ID:</td>
                                <td style={{ textAlign: 'right' }}>{item.Sensor_ID}</td>
                            </tr>
                            <tr>
                                <td>Average speed:</td>
                                <td style={{ textAlign: 'right' }}>{Math.round(item.avg_speed * 100)/100} km/h</td>
                            </tr>
                            <tr>
                                <td>Vehicle count:</td>
                                <td style={{ textAlign: 'right' }}>{item.vehicle_count}</td>
                            </tr>
                            <tr>
                                <td>Last updated:</td>
                                <td style={{ textAlign: 'right' }}>{day + ' ' + hour}</td>
                            </tr>
                        </table>
                    </Popup>
                    <Circle
                        center={{lat:item.localization[0], lng:item.localization[1]}}
                        fillColor={col}
                        radius={50} />
                </Marker>
            )
        });


        return (
            <LeafletMap center={position} zoom={16}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data}
                {/*<Marker position={position}>*/}
                {/*    <Popup minWidth="800">*/}
                {/*        <CanvasJSChart options = {options} />*/}
                {/*    </Popup>*/}
                {/*</Marker>*/}
            </LeafletMap>
        );
    }
}

export default Map;