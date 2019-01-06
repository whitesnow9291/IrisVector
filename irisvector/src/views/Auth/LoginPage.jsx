import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import InfoOutline from "@material-ui/icons/InfoOutline";
import LockOutline from "@material-ui/icons/LockOutline";
import image from "assets/img/bg7.jpg";
import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import { auth, firebase } from "firebase/index";
import { PulseLoader } from "halogenium";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      loading: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    let { dispatch } = this.props;
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({ type: "POST_LOGIN", data: authUser.uid });
      }
    });
  }
  login = () => {
    const { email, password } = this.state;
    this.setState({
      loading: true
    });
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        this.setState({ error: error });
        this.setState({
          loading: false
        });
      });
  };
  register = () => {
    this.props.history.push("/auth/register");
  };
  render() {
    if (this.props.user.currentUser.isLoggedIn === true) {
      return <Redirect to="/" />;
    }
    const { classes } = this.props;
    const { error } = this.state;
    return (
      <div>
        {/* <Header
          absolute
          color="transparent"
          brand="Material Kit PRO React"
          links={<HeaderLinks dropdownHoverColor="info" />}
        /> */}
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <form className={classes.form}>
                    <CardHeader
                      color="primary"
                      signup
                      className={classes.cardHeader}
                    >
                      <h4 className={classes.cardTitle}>Login</h4>
                      {/* <div className={classes.socialLine}>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fab fa-twitter" />
                        </Button>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fab fa-facebook" />
                        </Button>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fab fa-google-plus-g" />
                        </Button>
                      </div> */}
                    </CardHeader>
                    {/* <p
                      className={`${classes.description} ${classes.textCenter}`}
                    >
                      Or Be Classical
                    </p> */}
                    <CardBody signup>
                      {/* <CustomInput
                        id="first"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "First Name...",
                          type: "text",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      /> */}

                      {error && (
                        <SnackbarContent
                          message={
                            <span>
                              <b>Error:</b> {error.message}
                            </span>
                          }
                          color="danger"
                          icon={InfoOutline}
                        />
                      )}
                      {this.state.loading && (
                        <div style={{ textAlign: "center" }}>
                          <PulseLoader color="grey" size="16px" margin="4px" />
                        </div>
                      )}
                      <CustomInput
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Email...",
                          type: "email",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),

                          onChange: e =>
                            this.setState({ email: e.target.value })
                        }}
                      />
                      <CustomInput
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Password",
                          type: "password",
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutline
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          ),
                          onChange: e =>
                            this.setState({ password: e.target.value })
                        }}
                      />
                    </CardBody>
                    <div className={classes.textCenter}>
                      <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={this.login}
                      >
                        Get started
                      </Button>
                      <Button color="danger" size="lg" onClick={this.register}>
                        Register
                      </Button>
                    </div>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          {/* <Footer
            className={classes.footer}
            content={
              <div>
                <div className={classes.left}>
                  <List className={classes.list}>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="https://www.creative-tim.com/"
                        className={classes.block}
                      >
                        Creative Tim
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="https://www.creative-tim.com/presentation"
                        className={classes.block}
                      >
                        About us
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="//blog.creative-tim.com/"
                        className={classes.block}
                      >
                        Blog
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="https://www.creative-tim.com/license"
                        className={classes.block}
                      >
                        Licenses
                      </a>
                    </ListItem>
                  </List>
                </div>
                <div className={classes.right}>
                  &copy; {1900 + new Date().getYear()} , made with{" "}
                  <Favorite className={classes.icon} /> by{" "}
                  <a href="https://www.creative-tim.com">Creative Tim</a> for a
                  better web
                </div>
              </div>
            }
          /> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(withStyles(loginPageStyle)(LoginPage));
