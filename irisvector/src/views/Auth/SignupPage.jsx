import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
import InfoOutline from "@material-ui/icons/InfoOutline";
import LockOutline from "@material-ui/icons/LockOutline";
import image from "assets/img/bg7.jpg";
import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import { auth } from "firebase/index";
import { PulseLoader } from "halogenium";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";



class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      error: null,
      loading: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.setState({
      loading: true
    });
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.props.dispatch({type:'POST_REGISTER', data: authUser});
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

    event.preventDefault();
  };
  render() {
    if (this.props.user.currentUser.isLoggedIn === true) {
      return <Redirect to="/" />;
    }
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    const { classes, ...rest } = this.props;
    return (
      <div>
        {/* <Header
          absolute
          color="transparent"
          brand="Material Kit PRO React"
          links={<HeaderLinks dropdownHoverColor="rose" />}
          {...rest}
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
              <GridItem xs={12} sm={6} md={6}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>Register</h2>
                  <CardBody>
                    <GridContainer justify="center">
                      {/* <GridItem xs={12} sm={5} md={5}>
                        <InfoArea
                          className={classes.infoArea}
                          title="Marketing"
                          description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                          icon={Timeline}
                          iconColor="rose"
                        />
                        <InfoArea
                          className={classes.infoArea}
                          title="Fully Coded in HTML5"
                          description="We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
                          icon={Code}
                          iconColor="primary"
                        />
                        <InfoArea
                          className={classes.infoArea}
                          title="Built Audience"
                          description="There is also a Fully Customizable CMS Admin Dashboard for this product."
                          icon={Group}
                          iconColor="info"
                        />
                      </GridItem> */}
                      <GridItem xs={12}>
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
                            <PulseLoader
                              color="grey"
                              size="16px"
                              margin="4px"
                            />
                          </div>
                        )}
                      </GridItem>

                      <GridItem xs={6}>
                        {/* <div className={classes.textCenter}>
                          <Button justIcon round color="twitter">
                            <i
                              className={classes.socials + " fab fa-twitter"}
                            />
                          </Button>
                          {` `}
                          <Button justIcon round color="dribbble">
                            <i
                              className={classes.socials + " fab fa-dribbble"}
                            />
                          </Button>
                          {` `}
                          <Button justIcon round color="facebook">
                            <i
                              className={classes.socials + " fab fa-facebook-f"}
                            />
                          </Button>
                          {` `}
                          <h4 className={classes.socialTitle}>
                            or be classical
                          </h4>
                        </div> */}
                        <form className={classes.form}>
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Face
                                    className={classes.inputAdornmentIcon}
                                  />
                                </InputAdornment>
                              ),
                              placeholder: "Name",
                              onChange: e =>
                                this.setState({ username: e.target.value })
                            }}
                          />
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Email
                                    className={classes.inputAdornmentIcon}
                                  />
                                </InputAdornment>
                              ),
                              placeholder: "Email...",
                              onChange: e =>
                                this.setState({ email: e.target.value })
                            }}
                          />
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <LockOutline
                                    className={classes.inputAdornmentIcon}
                                  />
                                </InputAdornment>
                              ),
                              placeholder: "Password...",

                              onChange: e =>
                                this.setState({ passwordOne: e.target.value }),
                              type: "password"
                            }}
                          />
                          <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <LockOutline
                                    className={classes.inputAdornmentIcon}
                                  />
                                </InputAdornment>
                              ),
                              placeholder: "Confirm...",
                              onChange: e =>
                                this.setState({ passwordTwo: e.target.value }),
                              type: "password"
                            }}
                          />
                          {/* <FormControlLabel
                            classes={{
                              label: classes.label
                            }}
                            control={
                              <Checkbox
                                tabIndex={-1}
                                onClick={() => this.handleToggle(1)}
                                checkedIcon={
                                  <Check className={classes.checkedIcon} />
                                }
                                icon={
                                  <Check className={classes.uncheckedIcon} />
                                }
                                classes={{
                                  checked: classes.checked
                                }}
                                checked={
                                  this.state.checked.indexOf(1) !== -1
                                    ? true
                                    : false
                                }
                              />
                            }
                            label={
                              <span>
                                I agree to the{" "}
                                <a href="#pablo">terms and conditions</a>.
                              </span>
                            }
                          /> */}
                          <div className={classes.textCenter}>
                            <Button
                              round
                              color="primary"
                              onClick={this.onSubmit}
                              disabled={isInvalid}
                            >
                              Register
                            </Button>
                          </div>
                        </form>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          {/* <Footer
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
                  better web.
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
export default connect(
  mapStateToProps,
)(withStyles(signupPageStyle)(SignupPage));
