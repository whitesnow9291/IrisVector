/* eslint-disable */
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import profileImage from "assets/img/faces/avatar.jpg";
import navbarsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";






function HeaderLinks({ ...props }) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const { classes, dropdownHoverColor } = props;
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <Button
          href="/explore/"
          className={classes.navLink}
          color="transparent"
        >
          Explore
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="Analyze"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={[
            <Link to="/event/" className={classes.dropdownLink}>
              Events
            </Link>,
            <Link to="/recordingsandreports/" className={classes.dropdownLink}>
              Recordings & Reports
            </Link>,
            <Link to="/contributors/" className={classes.dropdownLink}>
              Contributors
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#"
          className={classes.navLink}
          onClick={e => e.preventDefault()}
          color="transparent"
        >
          Interact
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#"
          className={classes.navLink}
          onClick={e => e.preventDefault()}
          color="transparent"
        >
          Invest
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="Notification"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Notification1
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Notification2
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          left
          caret={false}
          hoverColor="dark"
          dropdownHeader="Dropdown Header"
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
          dropdownList={[
            "Settings",
            "Sign out"
          ]}
        />
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};

export default withStyles(navbarsStyle)(HeaderLinks);
