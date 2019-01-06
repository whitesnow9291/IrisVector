
import { container, title } from "assets/jss/material-kit-pro-react.jsx";
import buttonGroup from "assets/jss/material-kit-pro-react/buttonGroupStyle.jsx";
import commonStyle from "../common.style";
const styles = theme => ({
  ...commonStyle,
  container,
  section: {
    padding: "70px 0",
    paddingBottom: "0"
  },
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  navigation: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    marginTop: "0",
    minHeight: "740px"
  },
  formControl: {
    margin: "0 !important",
    paddingTop: "0"
  },
  inputRootCustomClasses: {
    margin: "0!important"
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    color: "inherit"
  },
  ...buttonGroup,
  cardNoMargin: {
    margin: 0
  },
  menuCard: {
    height: "100%"
  },
  mapContent: {
    width: "100%",
    height: "calc(100% - 70px)",
    marginTop: 70,
    position: 'absolute'
  },
  
  sectionBlank: {
    height: "80px",
    display: "block"
  },
  loader: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  }
});


export default styles;
