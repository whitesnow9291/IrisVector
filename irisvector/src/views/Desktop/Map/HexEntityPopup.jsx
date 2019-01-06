import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import InfoOutline from "@material-ui/icons/InfoOutline";
import basicStyles from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx";
import classNames from "classnames";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import { db } from "firebase/index";
import React from "react";
import commonStyle from "../common.style";
let styles = {
  ...basicStyles,
  ...commonStyle
};
class HexEntityPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubmit: false,
      showMessage: false,
      message: "",
      messageType: "danger",

      bet_category: "",
      predicted_value: 0,
      buy_in: 0
    };
  }
  componentDidMount() {
    console.info(this.props.uid);
  }
  onStartNew = () => {
    this.setState({
      showSubmit: true
    });
    this.props.onStartNew();
  };
  onCancel = () => {
    this.setState({
      showSubmit: false
    });
  };
  onSubmit = () => {
    const uid = this.props.uid;
    console.info("userid===>", uid);
    let params = {
      bet_category: this.state.bet_category,
      node_id: this.props.node_id,
      predicted_value: this.state.predicted_value,
      buy_in: this.state.buy_in
    };

    db.addbet(params)
      .then(result => {
        console.info(result);
        let params_chatroom = {
          bet_id: result.id,
          bet_amount: this.state.buy_in,
          node_id: this.props.node_id,
          status: "pending",
          created: Date.now(),
          updated: Date.now(),
          freeze_period: 3600 * 24 * 2
        };
        let params_order = {
          user_id: uid,
          bet_id: result.id,
          bet_amount: this.state.buy_in,
          node_id: this.props.node_id,
          created: Date.now(),
          updated: Date.now(),
          bet_category: this.state.bet_category
        };
        Promise.all([
          db.addchatroom(params_chatroom),
          db.addorder(params_order)
        ])
          .then(res => {
            console.info(res);
            this.showMessage("Success", "success");
          })
          .catch(err => {
            this.showMessage("Failed", "danger");
          });
        // this.props.onSubmit();
      })
      .catch(err => {
        this.showMessage("Failed", "danger");
      });
  };
  showMessage = (message, type) => {
    this.setState({
      message: message,
      messageType: type,
      showMessage: true
    });
    setTimeout(() => {
      this.setState({
        message: "",
        messageType: "danger",
        showMessage: false
      });
    }, 3000);
  };
  render() {
    const { classes } = this.props;
    let { ...props } = this.props;
    let { entry, match, whole_match, latlng } = props;
    whole_match = 100;
    let submitForm = (
      <div>
        <GridContainer>
          <GridItem xs={6} sm={4}>
            <label>Param:</label>
          </GridItem>
          <GridItem xs={6} sm={8}>
            <FormControl className={classes.formControl} fullWidth>
              <Select
                value={this.state.bet_category}
                onChange={e => {
                  this.setState({ bet_category: e.target.value });
                }}
                displayEmpty
                name="age"
                className={classes.selectEmpty}
              >
                {this.props.bet_categories.map((item, key) => (
                  <MenuItem value={item.id} key={key}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={6} sm={4}>
            <label>Predicted:</label>{" "}
          </GridItem>
          <GridItem xs={6} sm={8}>
            <CustomInput
              id="predicted"
              inputProps={{
                onChange: e => {
                  this.setState({ predicted_value: e.target.value });
                },
                placeholder: "Predicted"
              }}
              formControlProps={{
                fullWidth: true,

                className: classNames(classes.noMargin, classes.noPadding)
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={6} sm={4}>
            <label>BuyIn:</label>
          </GridItem>
          <GridItem xs={6} sm={8}>
            <CustomInput
              className={classNames(classes.noMargin, classes.noPadding)}
              id="buyin"
              inputProps={{
                onChange: e => {
                  this.setState({ buy_in: e.target.value });
                },
                placeholder: "Buy in"
              }}
              formControlProps={{
                fullWidth: true,
                className: classNames(classes.noMargin, classes.noPadding)
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={6} sm={4}>
            <label>Lat, Lng:</label>{" "}
          </GridItem>
          <GridItem xs={6} sm={8}>
            <p>{props.latlng.lat}</p>
            <p>{props.latlng.lng}</p>
          </GridItem>
        </GridContainer>
        <Button color="success" onClick={() => this.onSubmit()}>
          Submit
        </Button>
        <Button onClick={() => this.onCancel()}>Cancel</Button>
      </div>
    );
    let entryFrom = (
      <div>
        <p>Entry: {entry}</p>
        <p>
          Matches: {match} / {whole_match}
        </p>
        <Button color="success" onClick={() => this.onStartNew()}>
          {" "}
          Start New{" "}
        </Button>
      </div>
    );
    return (
      <div>
        {this.state.showMessage && (
          <SnackbarContent
            message={<span>{this.state.message}</span>}
            close
            color={this.state.messageType}
            icon={InfoOutline}
          />
        )}
        {!this.state.showSubmit && entryFrom}
        {this.state.showSubmit && submitForm}
      </div>
    );
  }
}

export default withStyles(styles)(HexEntityPopup);
