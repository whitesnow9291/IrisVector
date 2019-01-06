import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import InfoOutline from "@material-ui/icons/InfoOutline";
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import notificationsStyles from "assets/jss/material-kit-pro-react/views/componentsSections/notificationsStyles.jsx";

class SectionNotifications extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.section} cd-section`} id="notifications">
        <div className={classes.container}>
          <div className={classes.space70} />
          <div className={classes.title}>
            <h3>Notifications</h3>
          </div>
        </div>
        <SnackbarContent
          message={
            <span>
              <b>INFO ALERT:</b> You've got some friends nearby, stop looking at
              your phone and find them...
            </span>
          }
          close
          color="info"
          icon={InfoOutline}
        />
        <SnackbarContent
          message={
            <span>
              <b>SUCCESS ALERT:</b> You've got some friends nearby, stop looking
              at your phone and find them...
            </span>
          }
          close
          color="success"
          icon={Check}
        />
        <SnackbarContent
          message={
            <span>
              <b>WARNING ALERT:</b> You've got some friends nearby, stop looking
              at your phone and find them...
            </span>
          }
          close
          color="warning"
          icon={Warning}
        />
        <SnackbarContent
          message={
            <span>
              <b>DANGER ALERT:</b> You've got some friends nearby, stop looking
              at your phone and find them...
            </span>
          }
          close
          color="danger"
          icon={InfoOutline}
        />
        <Clearfix />
      </div>
    );
  }
}

export default withStyles(notificationsStyles)(SectionNotifications);
