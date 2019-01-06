
import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";
const styles = theme => ({
    ...headerLinksStyle(theme),
    navbar: {
      marginBottom: "-20px",
      zIndex: "100",
      position: "relative",
      overflow: "hidden",
      "& header": {
        borderRadius: "0",
        zIndex: "unset"
      }
    },img: {
        width: "40px",
        height: "40px",
        borderRadius: "50%"
      },
      imageDropdownButton: {
        padding: "0px",
        borderRadius: "50%",
        marginLeft: "5px"
      },
      buttonImg: {
        width: 40,
        height: 40
      },
});
export default styles;
