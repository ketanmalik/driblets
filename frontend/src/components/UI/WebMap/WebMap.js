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
        "esri/widgets/Editor",
      ],
      { css: true }
    ).then(([Locator, WebMap, MapView, Search, Editor]) => {
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

      this.view.when(() => {
        // this.view.popup.autoOpenEnabled = false;

        let searchWidget = new Search({
          view: this.view,
          locationEnabled: false,
          // disabled: true,
        });

        this.view.ui.add(searchWidget, {
          position: "top-right",
        });

        let editor = new Editor({
          view: this.view,
          allowedWorkflows: ["create"],
          _handleSave: (e) => this.addFeature(e),
        });

        this.view.ui.add(editor, {
          position: "top-right",
        });

        searchWidget.on("select-result", function (event) {
          console.log("event: ", event);
        });

        this.view.on("click", function (event) {
          // event is the event handle returned after the event fires.
          var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
          var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

          var params = {
            location: event.mapPoint,
          };

          locatorTask
            .locationToAddress(params)
            .then(function (response) {
              // If an address is successfully found, show it in the popup's content
              console.log(response);
            })
            .catch(function (error) {
              // If the promise fails and no result is found, show a generic message
              console.log("No address was found for this location");
            });
        });
      });
    });
  }

  addFeature = (event) => {
    console.log(event);
  };

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
    report: state.report,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReportAdded: (report) => dispatch(actions.addReport(report)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebMap);
