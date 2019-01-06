import sweetAlertStyle from "assets/jss/material-kit-pro-react/views/sweetAlertStyle.jsx";
const commonStyle = {
    ...sweetAlertStyle,
    floatRight: {
        float: "right !important"
    },
    maxcontent: {
        // width: "intrinsic",          /* Safari/WebKit uses a non-standard name */
        // width: "-moz-max-content",   /* Firefox/Gecko */
        // width: "-webkit-max-content", /* Chrome */
        width: "max-content"
    },
    noMargin: {
        margin: 0
    },
    noPadding: {
        padding: 0,
    },
    textCenter: {
      textAlign: "center"
    },
    textLeft: {
      textAlign: "left"
    },
    textRight: {
      textAlign: "right"
    },
    separate: {
      height: "2px",
      margin: '5px 0',
      background: "#4caf50"
    },
    block: {
      color: "inherit",
      padding: "0.9375rem",
      fontWeight: "500",
      fontSize: "12px",
      textTransform: "uppercase",
      borderRadius: "3px",
      textDecoration: "none",
      position: "relative",
      display: "block"
    },
  };
  
export default commonStyle;