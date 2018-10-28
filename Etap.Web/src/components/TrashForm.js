import React, { Component, Fragment } from 'react';
import TrashFormFields from './TrashFormFields.js'
import { connect } from 'react-redux';
import { withStyles, Typography, TextField } from '@material-ui/core/'
import { setValue } from '../ducks/formData';
const styles = {}


class TrashForm extends Component {
    constructor(props) {
        super(props)
        // this is just a test array to make sure they render correctly
        this.state = {
            items: ['Bags', 'Bottles', 'Carton', 'Compost', 'Glass']
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.items.map(ele => {
                    return (
                        <Fragment>
                            <h1>{ele}</h1>
                            <Route path={'/trashform'} />
                        </Fragment>
                    )
                })}
            </Fragment>
        )

    }

}

const mapStateToProps = state => ({ state });
const mapDispatchToProps = { setValue };


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrashForm));