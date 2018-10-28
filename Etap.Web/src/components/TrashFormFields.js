import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, TextField } from '@material-ui/core/'
import { setValue } from '../ducks/formData';
// import { itemListObj } from '../ducks/checklist.js';

const styles = {}

class TrashFormFields extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.setValue(this.props.type, "categories", this.props.id, "type")
    }

    render() {
        const { state, classes } = this.props
        const { formData } = state
        return (
            <Fragment>
                <h2>{this.props.type}</h2>
                <TextField
                    label="Total"
                    className={classes.textField}
                    value={formData.categories[this.props.id].total}
                    onChange={(e) => this.props.setValue(e.target.value, "categories", this.props.id, "total")}
                    margin="normal"
                    variant="outlined"
                    type="number"
                />

                <TextField
                    label={"Double Count"}
                    className={classes.textField}
                    value={formData.categories[this.props.id].doubleCount}
                    onChange={(e) => this.props.setValue(e.target.value, "categories", this.props.id, "doubleCount")}
                    margin="normal"
                    variant='outlined'
                    type="number"
                />

                <TextField
                    label="Shiny"
                    className={classes.textField}
                    value={formData.categories[this.props.id].shiny}
                    onChange={(e) => this.props.setValue(e.target.value, "categories", this.props.id, "shiny")}
                    margin="normal"
                    variant='outlined'
                />

                <TextField
                    label="Closed Loop"
                    className={classes.textField}
                    value={formData.categories[this.props.id].closedLoop}
                    onChange={(e) => this.props.setValue(e.target.value, "categories", this.props.id, "closedLoop")}
                    margin="normal"
                    variant='outlined'
                />

                <TextField
                    label="Open Container"
                    className={classes.textField}
                    value={formData.categories[this.props.id].openContainer}
                    onChange={(e) => this.props.setValue(e.target.value, "categories", this.props.id, "openContainer")}
                    margin="normal"
                    variant='outlined'
                />

                <TextField
                    label="Fouled"
                    className={classes.textField}
                    value={formData.categories[this.props.id].fouled}
                    onChange={(e) => this.props.setValue(e.target.value, "categories", this.props.id, "fouled")}
                    margin="normal"
                    variant='outlined'
                />

                <TextField
                    label="Item Notes"
                    className={classes.textField}
                    value={formData.categories[this.props.id].itemNotes}
                    onChange={(e) => this.props.setValue(e.target.value, "categories", this.props.id, "itemNotes")}
                    margin="normal"
                    variant='outlined'
                />

                <TextField
                    label="Weight"
                    className={classes.textField}
                    value={formData.categories[this.props.id].weight}
                    onChange={(e) => this.props.setValue(e.target.value, "categories", this.props.id, "weight")}
                    margin="normal"
                    variant='outlined'
                    type="number"
                />

            </Fragment>
        );
    };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = { setValue };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrashFormFields));