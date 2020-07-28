import React, { Component } from "react";
import { loadModules } from "esri-loader";
import "./WebMap.css";

class WebMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    loadModules(
      [
        "esri/WebMap",
        "esri/views/MapView",
        "esri/widgets/Search",
        "esri/widgets/Editor",
      ],
      { css: true }
    ).then(([WebMap, MapView, Search, Editor]) => {
      const webmap = new WebMap({
        portalItem: {
          id: "097f6aad63e04f56a6918e71b7b043e0",
        },
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: webmap,
      });

      this.view.when(() => {
        console.log("view loaded");

        this.view.popup.autoOpenEnabled = false;

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
        });

        this.view.ui.add(editor, {
          position: "top-right",
        });

        searchWidget.on("select-result", function (event) {
          console.log("event: ", event);
        });
      });
    });
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
