import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, TextField } from '@material-ui/core/'
import { setValue } from '../ducks/formData';
// import { itemListObj } from '../ducks/checklist.js';

const styles = {}

// pass them the id of the menu item
// through redux props

class TrashFormFields extends Component {

    // impor the action creator to send the payload to
    handleSubmit = (event) => {

    }

    render() {
        const { state, classes } = this.props
        const { formData } = state
        return (
            <Fragment>

                <TextField
                    label="Total"
                    className={classes.textField}
                    value={formData.siteInfo.siteName}
                    onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "siteName")}
                    margin="normal"
                    variant="outlined"
                    type="number"
                />

                <TextField
                    label={"Double Count"}
                    className={classes.textField}
                    value={formData.siteInfo.siteLocation}
                    onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "siteLocation")}
                    margin="normal"
                    variant='outlined'
                    type="number"
                />

                {/* these are the four items in the in threat assesment portion */}
                <TextField
                    label="Shiny"
                    className={classes.textField}
                    value={formData.siteInfo.overallSiteBoundary}
                    onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "overallSiteBoundary")}
                    margin="normal"
                    variant='outlined'
                />

                <TextField
                    label="Closed Loop"
                    className={classes.textField}
                    value={formData.siteInfo.overallSiteBoundary}
                    onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "overallSiteBoundary")}
                    margin="normal"
                    variant='outlined'
                />

                <TextField
                    label="Open Container"
                    className={classes.textField}
                    value={formData.siteInfo.overallSiteBoundary}
                    onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "overallSiteBoundary")}
                    margin="normal"
                    variant='outlined'
                />

                <TextField
                    label="Fouled"
                    className={classes.textField}
                    value={formData.siteInfo.overallSiteBoundary}
                    onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "overallSiteBoundary")}
                    margin="normal"
                    variant='outlined'
                />

                <TextField
                    label="Item Notes"
                    className={classes.textField}
                    value={formData.siteInfo.boundaryNotes}
                    onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "boundaryNotes")}
                    margin="normal"
                    variant='outlined'
                />

                <TextField
                    label="Weight"
                    className={classes.textField}
                    value={formData.siteInfo.totalSiteArea}
                    onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "totalSiteArea")}
                    margin="normal"
                    variant='outlined'
                    type="number"
                />

            </Fragment>
        );
    };
};

////////////////////////////////////////////////////////////
// WE NEED A SUBMIT BUTTON ATTACHED TO AN ACTION CREATOR
////////////////////////////////////////////////////////////

const mapStateToProps = state => ({ state });
const mapDispatchToProps = { setValue };


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrashFormFields));