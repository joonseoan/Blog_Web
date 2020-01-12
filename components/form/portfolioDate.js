import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker.css";

// console.log(moment()) // moment object
export default class PortfolioDate extends Component {
    
    state={ 
        // moment(): moment object (It is today).
        // whenever we change value in calendar, the new moment object
        //  is assigned here.
        dateValue: moment() 
    };

    handleChange = (date, { setFieldValue, setFieldTouched, values, name }) => {
        

        console.log(date, 'dddddddddddddddd')
        // When use Lib like the one, DatePicker below,
        //   we can implement Formik's Form fields

        // Get form fields such as setFieldValue / setFieldTouched
        // const { setFieldValue, setFieldTouched, values } = this.props.form;
        // const { name } = this.props.field;

        this.setState({ dateValue: date });
        
        // For key name and value of Formik's "values"
        //  name: input key name
        // date: value 
        // true: should validate it
        setFieldValue(name, date, true);

        //  name: input key name
        // true: touched 
        // true: should validate it
        // setFieldTouched(name, true, true);
    }

    render() {

        const { 
            form: { 
                touched, 
                errors, 
                values,
                setFieldValue, 
                setFieldTouched
            }, 
            field: {
                name
            }, 
            label
            } = this.props;

        return (
            <span>
                <label>{ label }</label>
                <DatePicker
                    selected={ values[name] || null }
                    onChange={ (date) => this.handleChange(date, { 
                        setFieldValue, setFieldTouched, 
                        values, name 
                    })}
                    // ???
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    minDate={ moment() }
                    // for birth dacy check
                    // maxDate={ moment()}
                    dropDownMode="select"
                />
                {
                    touched[ name ] &&
                        errors[ name ] && <div className="sform-group__error error">
                            { errors[ name ] }
                        </div>
                }
            </span>
        );
    }
}