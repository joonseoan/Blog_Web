import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

// console.log(moment()) // moment object
export default class PortfolioDate extends Component {
    
    state={ 
        // moment(): moment object (It is today).
        // whenever we change value in calendar, the new moment object
        //  is assigned here.
        dateValue: moment() 
    };

    handleChange = date => {
        console.log('date is moment"s object: ', date)

        // const formattedDate = date.format();

        this.setState({ dateValue: date });
    }

    render() {
        return (
            <DatePicker
                selected={ this.state.dateValue }
                onChange={ this.handleChange }
            />
        );
    }
}