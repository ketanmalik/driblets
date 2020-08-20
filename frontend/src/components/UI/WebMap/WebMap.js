import React, { Component } from "react";
import { loadModules } from "esri-loader";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import "./WebMap.css";

class WebMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    loadModules(
      [
        "esri/tasks/Locator",
        "esri/WebMap",
        "esri/views/MapView",
        "esri/widgets/Search",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
      ],
      { css: true }
    ).then(([Locator, WebMap, MapView, Search, Graphic, GraphicsLayer]) => {
      var locatorTask = new Locator({
        url:
          "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
      });

      const webmap = new WebMap({
        portalItem: {
          id: "c86a00fda2a64e569bb9a0e3df535442",
        },
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: webmap,
      });

      if (this.props.mode !== "home") {
        this.view.when(() => {
          var graphicsLayer = new GraphicsLayer();
          webmap.add(graphicsLayer);

          let searchWidget = new Search({
            view: this.view,
            locationEnabled: false,
            // disabled: true,
          });

          this.view.ui.add(searchWidget, {
            position: "top-right",
          });

          searchWidget.on("select-result", function (event) {});

          let self = this;

          this.view.on("click", function (event) {
            let lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
            let lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

            let params = {
              location: event.mapPoint,
            };

            locatorTask
              .locationToAddress(params)
              .then(function (response) {
                graphicsLayer.removeAll();
                let point = {
                  type: "point",
                  longitude: lon,
                  latitude: lat,
                };

                let simpleMarkerSymbol = {
                  type: "simple-marker",
                  color: [226, 119, 40],
                  outline: {
                    color: [255, 255, 255],
                    width: 1,
                  },
                };

                let pointGraphic = new Graphic({
                  geometry: point,
                  symbol: simpleMarkerSymbol,
                });
                graphicsLayer.add(pointGraphic);
                self.props.onAddReportAddress({
                  address: response.address,
                  x_lon: response.location.x,
                  y_lat: response.location.y,
                });
              })
              .catch(function (error) {
                graphicsLayer.removeAll();
                self.props.onAddReportAddress({
                  address: "",
                  x_lon: "",
                  y_lat: "",
                });
              });
          });
        });
      }
    });
  }

  addFeature = (event) => {};

  componentWillUnmount() {
    if (this.view) {
      this.view.container = null;
    }
  }

  render() {
    return <div className="webmap-wrapper" ref={this.mapRef} />;
  }
}

const mapStateToProps = (state) => {
  return {
    address: state.dyp.report.address,
    report: state.dyp.report,
    x_lon: state.dyp.report.x_lon,
    y_lat: state.dyp.report.y_lat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReportAdded: (report) => dispatch(actions.addReport(report)),
    onAddReportAddress: (address) =>
      dispatch(actions.addReportAddress(address)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebMap);
