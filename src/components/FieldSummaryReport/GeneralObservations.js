import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, TextField, FormControl, FormLabel, FormHelperText } from '@material-ui/core/'
import { setValue } from '../../ducks/formData';

// style the default height and width of the text area

const styles = theme => ({
    root: {
      display: 'flex'
    },
    formHeading: {
      margin: theme.spacing.unit * 3
    },
    group: {
      margin: `${theme.spacing.unit}px 0`
    },
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
});


class GeneralObservations extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { state, classes } = this.props;
        const { formData } = state;
        return (
            <div className={classes.container}>
                <FormControl component="fieldset" className={classes.formHeading}>
                    <FormLabel component="legend">General Observations</FormLabel>
                    <FormHelperText>General observations (including but not limited to recent big event in the area, nearby buildings, excessive trash near buildings, transit hub or bus stop, other features that could contribute to trash condition)</FormHelperText>
                </FormControl>

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