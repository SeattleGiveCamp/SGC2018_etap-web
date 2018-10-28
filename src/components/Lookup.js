/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const suggestions = [
  { phrase:"Napkins", category:"4" },
  { phrase:"Lollypop Sticks (paper)", category:"5" },
  { phrase:"Books", category:"7" },
  { phrase:"Pull Tabs (metal)",  category:"13"},
  { phrase:"Strapping Bands",  category:"14"},
  { phrase:"Pull Tabs (plastic)",  category:"21"},
  { phrase:"6-pack Rings",  category:"21"},
  { phrase:"Coozies (plastic)",  category:"22"},
  { phrase:"Cling Wrap",  category:"24"},
  { phrase:"Film Wrapping",  category:"24"},
  { phrase:"Peanuts (foam packing)",  category:"24"},
  { phrase:"Shrink Wrap",  category:"24"},
  { phrase:"Bubble Wrap",  category:"24"},
  { phrase:"Cable Ties",  category:"24"},
  { phrase:"Zip Ties",  category:"24"},
  { phrase:"Foil",  category:"24"},
  { phrase:"Twist Ties",  category:"24"},
  { phrase:"Lollypop Sticks (plastic)",  category:"24"},
  { phrase:"Strapping Bands (plastic)",  category:"24"},
  { phrase:"Tips (cigar, plastic)",  category:"27"},
  { phrase:"Chewing Tobacco",  category:"27"},
  { phrase:"Lighters",  category:"28"},
  { phrase:"Razor Blades",  category:"29"},
  { phrase:"Fishing Hooks",  category:"30"},
  { phrase:"Ointment",  category:"31"},
  { phrase:"Band-Aids",  category:"31"},
  { phrase:"Condoms",  category:"32"},
  { phrase:"Hand Warmers",  category:"32"},
  { phrase:"Ear Plugs",  category:"32"},
  { phrase:"Hair Bands",  category:"32"},
  { phrase:"Ear Buds",  category:"32"},
  { phrase:"Thread",  category:"33"},
  { phrase:"Fabric",  category:"33"},
  { phrase:"CDs",  category:"34"},
  { phrase:"Batteries (except auto or boat batteries)",  category:"34"},
  { phrase:"Balloons",  category:"35"},
  { phrase:"Fireworks Debris",  category:"35"},
  { phrase:"Ammunition",  category:"35"},
  { phrase:"Casings",  category:"35"},
  { phrase:"Tents",  category:"36"},
  { phrase:"Candles",  category:"36"},
  { phrase:"Traffic Cones",  category:"37"},
  { phrase:"Buckets, and Equipment",  category:"37"},
  { phrase:"Hard Hats",  category:"38"},
  { phrase:"Plastic Pipes",  category:"38"},
  { phrase:"Wire",  category:"38"},
  { phrase:"Fluorescent Bulbs",  category:"39"},
  { phrase:"LED Bulbs/Lamps",  category:"39"},
  { phrase:"Lightbulbs",  category:"39"},
  { phrase:"Plastic Rope",  category:"39"},
  { phrase:"Batteries (car or boat)",  category:"40"},
  { phrase:"Food or Food Scraps",  category:"45"},
  { phrase:"Chewing Gum",  category:"45"},
  { phrase:"Pet Waste",  category:"45"},
  { phrase:"Human Waste",  category:"45"},
  { phrase:"Corks",  category:"45"},
  { phrase:"Popsicle Sticks (wooden)",  category:"45"},
  { phrase:"Chop Sticks (wood or bamboo)",  category:"45"},
  { phrase:"Stirrers (wood)",  category:"45"}
].map(suggestion => ({
  value: suggestion.phrase,
  label: "[Category: " + suggestion.category + "] " + suggestion.phrase,
}));

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class IntegrationReactSelect extends React.Component {
  state = {
    single: null,
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            options={suggestions}
            components={components}
            value={this.state.single}
            onChange={this.handleChange('single')}
            placeholder="Search for difficult to categorize items"
          />
        </NoSsr>
      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);