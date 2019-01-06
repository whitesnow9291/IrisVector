import {
  container,
  title,
  main,
  mainRaised,
  mrAuto,
  mlAuto,
  section
} from "assets/jss/material-kit-pro-react.jsx";
const appStyle = {
  main,
  mainRaised,
  mrAuto,
  mlAuto,
  container: {
    ...container,
    zIndex: 1
  },
  title: {
    ...title,
    "&, & + h4": {
      color: "#fff"
    }
  },
  section: {
    ...section,
    padding: "70px 0px"
  },
  sectionBlank: {
    height: "70px",
    display: "block"
  },

  space50: {
    height: "50px",
    display: "block"
  },
  space70: {
    height: "70px",
    display: "block"
  },
  brand: {
    color: "#FFFFFF",
    textAlign: "center",
    "& h1": {
      fontSize: "4.2rem",
      fontWeight: "600",
      display: "inline-block",
      position: "relative"
    },
    "& h3": {
      fontSize: "1.313rem",
      maxWidth: "500px",
      margin: "10px auto 0"
    }
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  },
  proBadge: {
    position: "absolute",
    fontSize: "22px",
    textTransform: "uppercase",
    fontWeight: "bold",
    right: "-90px",
    top: "-3px",
    padding: "10px 18px",
    backgroundColor: "#fff",
    borderRadius: "3px",
    color: "#444",
    lineHeight: "22px",
    boxShadow: "0px 5px 5px -2px rgba(31,31,31,0.4)"
  },
  sectionGray: {
    background: "#e5e5e5"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  left: {
    float: "left!important",
    padding: "15px 0",
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right"
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative"
  },
};

export default appStyle;
