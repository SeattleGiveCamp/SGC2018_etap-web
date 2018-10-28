import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, TextField, FormControl, FormControlLabel, Select, InputLabel, OutlinedInput } from '@material-ui/core/'
import { setValue } from '../ducks/formData';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textField: {
        minWidth: '100%',
        marginTop: 10,
        marginBottom: 10,
        margin: 'none',
    },
    weightContainer: {
        display: 'flex',
        flexDirection: 'row',
        minWidth: '100%',
        marginTop: 10,
        marginBottom: 10,
        margin: 'none',
        justifyContent: 'center',
        alignItems: 'center',
    },
    weightField: {
        marginTop: 10,
        width: '30%',
    },
    formControl: {
        width: '31%',
        marginLeft: 10,
    }
}

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
            <div className={classes.container}>
                <h2 style={{ textAlign: 'center' }}><b>{`(${(this.props.id)})`}</b>{` [${this.props.group}] `} <br /> {`${this.props.type}`}</h2>
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

                <div className={classes.weightContainer}>
                    <TextField
                        label="Weight"
                        className={classes.weightField}
                        value={formData.categories[this.props.id].weight}
                        onChange={(e) => this.props.setValue(e.target.value, "categories", this.props.id, "weight")}
                        margin="normal"
                        variant='outlined'
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel shrink={true}>
                            Unit
          </InputLabel>
                        <Select
                            native
                            value={formData.categories[this.props.id].weightUnit}
                            onChange={(e) => this.props.setValue(e.target.value, "categories", this.props.id, "weight unit")}
                            input={
                                <OutlinedInput
                                    name="unit"
                                    labelWidth={75}
                                />
                            }
                        >
                            <option value=""></option>
                            <option value="lbs">lbs</option>
                            <option value="grams">grams</option>
                            <option value="ounces">ounces</option>
                            <option value="ounces">gn</option>

                        </Select>
                    </FormControl>
                </div>

            </div>
        );
    };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = { setValue };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrashFormFields));