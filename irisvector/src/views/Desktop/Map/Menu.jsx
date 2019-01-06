
import React from "react";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import styles from "./Menu.style";
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    _menuToggle = (e) => {
        e.stopPropagation();
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        const { classes } = this.props;
        let menuStatus = this.state.isOpen ? 'isopen' : '';

        return (
            <div className={classNames(classes.menu,this.props.position)}>
                {this.props.position == "right" && this.state.isOpen && <div className={classes.menu_content}>
                    {this.props.children}
                </div>}
                <div className={classes.menu_handle}>
                    <Button color="rose" size="sm" className={classes.menu_handle_btn} onClick={this._menuToggle} >|||
                    </Button>
                </div>
                {this.props.position == "left" && this.state.isOpen && <div className={classes.menu_content}>
                    {this.props.children}
                </div>}
            </div>
        )
    }
}

export default withStyles(styles)(Menu);