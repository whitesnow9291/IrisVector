// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import Badge from "components/Badge/Badge.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { db } from "firebase/index";
import { GridLoader } from "halogenium";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import ReactDOM from "react-dom";
import AppHeader from "../Header/AppHeader";
import styles from "./GameArea.style";
import HexEntityPopup from "./HexEntityPopup";
import Menu from "./Menu";
import { connect } from "react-redux";
var google = window.google;
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibm9tdXJhbm9yaSIsImEiOiJjam04MHFwY2MwdXJ1M3dxcWtyNGVqenRoIn0.qtjb1EsVIJGRY36hiD5sIg";
mapboxgl.accessToken = MAPBOX_TOKEN;

class GameArea extends React.Component {
  map;
  marker;
  constructor(props) {
    super(props);
    this.state = {
      center: [-98, 38.88],
      min_zoom: 3.5,
      zoom: 1,
      max_zoom: 5,
      hex_size: 100,
      hexagon_option: { units: "miles" },
      map_style: [
        "mapbox://styles/mapbox/light-v9",
        "mapbox://styles/mapbox/dark-v9"
      ],
      max_bound: [
        [-150, 10], // Southwest coordinates
        [-40, 60] // Northeast coordinates
      ],
      hexdatas: [],
      bet_categories: [],
      data_loaded: false
    };
  }
  componentWillMount() {
    this.loadInitData();
  }
  loadInitData = () => {
    let hexdatas = [];
    let bet_categories = [];
    db.gethexdata()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let hexone = doc.data();
          hexone.coordinates = this.obj2Arr(hexone.coordinates);
          hexdatas.push(hexone);
        });
        this.setState({
          hexdatas: hexdatas,
          data_loaded: true
        });
        this.initializeMap(this.state.hexdatas);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    db.getbetcategories()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let categoryone = doc.data();
          bet_categories.push({
            id: doc.id,
            ...categoryone
          });
        });
        this.setState({
          bet_categories: bet_categories
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };
  initializeMap = gridData => {
    let features = [];
    for (let i = 0; i < gridData.length; i++) {
      let feature = {
        type: "Feature",
        properties: {
          bottomleft: gridData[i].bottomleft,
          topright: gridData[i].topright,
          entry: 200 + (i % 10) * 10,
          color: i % 3,
          matches: i % 50,
          node_id: gridData[i].id
        },
        geometry: {
          type: "Polygon",
          coordinates: [gridData[i].coordinates]
        }
      };
      features.push(feature);
    }
    this.map.addLayer({
      id: "hexgrid",
      type: "fill",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: features
        }
      },
      layout: {},
      paint: {
        "fill-color": {
          property: "color",
          stops: [[0, "green"], [1, "blue"], [2, "red"]]
        },
        "fill-opacity": 0.1,
        "fill-outline-color": "red"
      }
    });
  };
  addPopup(el, coord) {
    const placeholder = document.createElement("div");
    ReactDOM.render(el, placeholder);

    this.marker = new mapboxgl.Popup()
      .setDOMContent(placeholder)
      .setLngLat({ lng: coord.lng, lat: coord.lat })
      .addTo(this.map);
  }
  panToSelectedHex = bounds => {
    this.map.fitBounds(bounds);
    this.setState({
      zoom: 3
    });
  };
  onSubmitForm = () => {
    this.marker.remove();
    alert("Form submitted correctly!");
  };
  obj2Arr = obj => {
    return Object.keys(obj).map(function(key) {
      return obj[key];
    });
  };
  createMap = () => {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.state.map_style[0],
      center: this.state.center,
      zoom: this.state.zoom,
      maxBounds: [[-180, -85], [180, 85]]
    });
    this.map.on("click", "hexgrid", e => {
      let coordinates = e.lngLat;
      let bottomleft = JSON.parse(e.features[0].properties["bottomleft"]);
      let topright = JSON.parse(e.features[0].properties["topright"]);
      let node_id = JSON.parse(e.features[0].properties["node_id"]);
      let bounds = [
        [bottomleft.lng, bottomleft.lat],
        [topright.lng, topright.lat]
      ];
      let description = (
        <HexEntityPopup
          entry={e.features[0].properties["entry"]}
          match={e.features[0].properties["matches"]}
          onStartNew={() => this.panToSelectedHex(bounds)}
          latlng={coordinates}
          onSubmit={() => this.onSubmitForm()}
          node_id={node_id}
          uid = {this.props.user.currentUser.uid}
          bet_categories={this.state.bet_categories}
        />
      );
      this.addPopup(description, coordinates);
    });
    this.map.on("style.load", () => {});
    // Change the cursor to a pointer when the mouse is over the places layer.
    this.map.on("mouseenter", "hex", () => {
      this.map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    this.map.on("mouseleave", "hex", () => {
      this.map.getCanvas().style.cursor = "";
    });
  };
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.createMap();
  }
  onDarkMap = () => {
    this.map.setStyle(this.state.map_style[1]);
  };
  onLightMap = () => {
    this.map.setStyle(this.state.map_style[0]);
  };
  render() {
    const { lng, lat, zoom } = this.state;

    const { classes, ...rest } = this.props;
    return (
      <div>
        <AppHeader />
        <Menu position="left">
          <Card
            className={classNames(
              classes.card,
              classes.cardNoMargin,
              classes.menuCard
            )}
          >
            <CardBody className={classes.cardBody}>
              <h6 className={classes.cardCategory}>Map setting</h6>
              <div className={classes.buttonGroup}>
                <Button
                  color="info"
                  size="sm"
                  round
                  className={classes.firstButton}
                  onClick={this.onDarkMap}
                >
                  Dark
                </Button>
                <Button
                  color="info"
                  size="sm"
                  round
                  className={classes.lastButton}
                  onClick={this.onLightMap}
                >
                  Light
                </Button>
              </div>
            </CardBody>
          </Card>
        </Menu>
        <Menu position="right">
          <Card
            className={classNames(
              classes.card,
              classes.cardNoMargin,
              classes.menuCard
            )}
          >
            <CardBody className={classes.cardBody}>
              <h4 className={classes.cardCategory}>Score</h4>
              <h6 className={classes.textMuted}>
                Mighty <Badge>1000000</Badge>
              </h6>
              <h6 className={classes.textMuted}>
                Zeus <Badge color="primary">18729</Badge>
              </h6>
              <h6 className={classes.textMuted}>
                Thanos <Badge color="info">187700</Badge>{" "}
              </h6>
              <h6 className={classes.textMuted}>
                Stark <Badge color="success">17545</Badge>{" "}
              </h6>
              <h6 className={classes.textMuted}>
                Player1 <Badge color="warning">155555</Badge>{" "}
              </h6>
              <h6 className={classes.textMuted}>
                Unknown <Badge color="danger">12034</Badge>{" "}
              </h6>
              <h6 className={classes.textMuted}>
                Alis <Badge color="rose">8000</Badge>{" "}
              </h6>
              <h6 className={classes.textMuted}>
                Noname <Badge>2000</Badge>{" "}
              </h6>
            </CardBody>
          </Card>
        </Menu>
        <div
          ref={el => (this.mapContainer = el)}
          className={classes.mapContent}
        />
        {!this.state.data_loaded && (
          <GridLoader
            className={classes.loader}
            color="#26A65B"
            size="16px"
            margin="4px"
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(withStyles(styles)(GameArea));
