import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, TextField } from '@material-ui/core/'
import { setValue } from '../../ducks/formData';

// style the default height and width of the text area

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textArea: {
        marginTop: 10,
        marginBottom: 10,
        margin: 'auto',
    }
}


class GeneralObservations extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { state, classes } = this.props;
        const { formData } = state;
        return (
            <div className={classes.container}>
                <h2 style={{ textAlign: 'center' }}>General Observations</h2>
                <p><i>General observations (including but not limited to recent big event in the area, nearby buildings, excessive trash near buildings, transit hub or bus stop, other features that could contribute to trash condition)</i></p>
                <TextField
                    label="Notes"
                    className={classes.textArea}
                    value={formData.generalObservation}
                    onChange={(e) => this.props.setValue(e.target.value, "generalObservation")}
                    margin="normal"
                    variant="outlined"
                    type="string"
                    multiline
                    rowsMax="10"
                />
            </div>
        );
    };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = { setValue };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GeneralObservations));