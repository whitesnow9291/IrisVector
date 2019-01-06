import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import gameImg from "assets/img/app/game.png";
import informationImg from "assets/img/app/information.png";
import leaderboardImg from "assets/img/app/leaderboard.png";
import logoImg from "assets/img/app/logo.png";
import ordersImg from "assets/img/app/orders.png";
import weatherImg from "assets/img/app/weather.png";
import profileImage from "assets/img/faces/avatar.jpg";
// nodejs library that concatenates classes
import classNames from "classnames";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Header from "components/Header/Header.jsx";
import { auth, firebase } from "firebase/index";
import React from "react";
import { connect } from "react-redux";
// core components
import headerStyle from "./AppHeader.style";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.headerColorChange = this.headerColorChange.bind(this);
  }
  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange);
    }
  }
  headerColorChange() {
    const { classes, color, changeColorOnScroll } = this.props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  }
  componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      window.removeEventListener("scroll", this.headerColorChange);
    }
  }
  logout = () => {
    const { dispatch } = this.props;
    auth.doSignOut().then(() => {
      dispatch({ type: "POST_LOGOUT" });
    });
  };
  render() {
    const { classes, color, links, brand, fixed, absolute } = this.props;
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed
    });
    return (
      <Header
        brand={
          <div>
            <img className={classes.buttonImg} src={logoImg} />
          </div>
        }
        color="white"
        fixed
        className={classes.appHeader}
        links={
          <List className={classes.list + " " + classes.mlAuto}>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink}
                onClick={e => e.preventDefault()}
              >
                <img className={classes.buttonImg} src={gameImg} />
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink}
                onClick={e => e.preventDefault()}
              >
                <img className={classes.buttonImg} src={weatherImg} />
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink}
                onClick={e => e.preventDefault()}
              >
                <img className={classes.buttonImg} src={ordersImg} />
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink}
                onClick={e => e.preventDefault()}
              >
                <img className={classes.buttonImg} src={leaderboardImg} />
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink}
                onClick={e => e.preventDefault()}
              >
                <img className={classes.buttonImg} src={informationImg} />
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>$1000</ListItem>
            <ListItem className={classes.listItem}>
              <CustomDropdown
                caret={false}
                left
                hoverColor="dark"
                buttonText={
                  <img
                    src={profileImage}
                    className={classes.img}
                    alt="profile"
                  />
                }
                buttonProps={{
                  className:
                    classes.navLink + " " + classes.imageDropdownButton,
                  color: "transparent"
                }}
                dropdownList={[<div onClick={this.logout}>Sign out</div>]}
              />
            </ListItem>
          </List>
        }
      />
    );
  }
}

Header.defaultProp = {
  color: "white"
};

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(withStyles(headerStyle)(AppHeader));
