import React, { Component } from "react";
import { loadModules } from "esri-loader";
import "./WebMap.css";

class WebMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    loadModules(["esri/Map", "esri/views/MapView"], { css: true }).then(
      ([ArcGISMap, MapView]) => {
        const map = new ArcGISMap({
          basemap: "topo-vector",
        });

        this.view = new MapView({
          container: this.mapRef.current,
          map: map,
          center: [-118, 34],
          zoom: 8,
        });
      }
    );
  }

  componentWillUnmount() {
    if (this.view) {
      this.view.container = null;
    }
  }

  render() {
    return <div className="webmap-wrapper" ref={this.mapRef} />;
  }
}

export default WebMap;
