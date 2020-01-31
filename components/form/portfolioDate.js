import React, { Component, Fragment } from 'react';
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

        // [ Use Formik only. Then, commented out ]
        // dateValue: moment(),
        isPresentJob: false 
    };

    handleChange = (date, { setFieldValue, setFieldTouched, name }) => {
        /* 
            // [ Use Formik only. Then, commented out ]
            // When use Lib like the one, DatePicker below,
            //   we can implement Formik's Form fields

            // Get form fields such as setFieldValue / setFieldTouched
            // const { setFieldValue, setFieldTouched, values } = this.props.form;
            // const { name } = this.props.field;

            // this.setState({ dateValue: date });
        
         */
        
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

    // not going to Formik Validation
    handleEndDateChange = (e, values, name) => {
        this.props.getCheckValue(!this.state.isPresentJob);

        // const { name, checked } = e.target;
        this.setState({ 
            isPresentJob: !this.state.isPresentJob,
        });
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
            label,
            type
        } = this.props;

        return (

            <Fragment>
                <label 
                    className={`${ name === 'present' ? 'sform-group-present__label' : 'sform-group__label'}`} 
                    htmlFor={ name  === "present" ? name : undefined }
                >
                    { name === "endDate" ? "End Date" : name === "present" ? name : "Start Date" }
                </label>
              
                { type ?   
                    (<input
                        className="sform-group-present__input"   
                        id={ name } 
                        type={ type } 
                        name={ name } 
                        value={ values[ name ] }
                        onChange={ e => this.handleEndDateChange(e, values, name) }
                    />) :
                    (
                        <DatePicker
                            className="sform-group__input"                       
                            selected={ values[ name ] || null }
                            onChange={ date => this.handleChange(date, { 
                                setFieldValue, setFieldTouched, name 
                            })}
                            // ???
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            // for future plans
                            // minDate={ moment() }
                            
                            // for birth dacy check
                            // for carrier or experiences
                            maxDate={ moment() }
                            dropDownMode="select"
                        /> 
                    )
                }
                {
                    (!type && touched[ name ] && errors[ name ]) && <div className="sform-group__error error">
                            { errors[ name ] }
                    </div>
                }
            </Fragment>
        );
    }
}

// /*                  
//                 {!type && (<div} 
//                 // /* `sform-group sform-group-${ name }  */
//                 //         // className={`sform-group-${ this.state.isPresentJob === false ? "show" : "hide" }`}
//                 //         style={{ visibility : this.state.isPresentJob ? "hidden" : "visible" }}
//                 //     >
//                 //         <label 
//                 //             className="sform-group__label">
//                 //             { name === 'startDate' ? "Start Date" : "End Date" }
//                 //         </label>
//                 //         <div className="sform-group__input--date">
//                 //             <DatePicker                       
//                 //                 selected={ values[ name ] || null }
//                 //                 onChange={ date => this.handleChange(date, { 
//                 //                     setFieldValue, setFieldTouched, name 
//                 //                 })}
//                 //                 // ???
//                 //                 peekNextMonth
//                 //                 showMonthDropdown
//                 //                 showYearDropdown
//                 //                 // for future plans
//                 //                 // minDate={ moment() }
                                
//                 //                 // for birth dacy check
//                 //                 // for carrier or experiences
//                 //                 maxDate={ moment() }
//                 //                 dropDownMode="select"
//                 //             />
//                 //         </div>
//                 //         {
//                 //             (!type && errors[ name ] && touched[ name ]) && <div className="sform-group__error error">
//                 //                     { errors[ name ] }
//                 //             </div>
//                 //         }
//                 //     </div>)       
//                 // }






//                                 { !type && (<div 
//                 /* `sform-group sform-group-${ name }  */
//                         // className={`sform-group-${ this.state.isPresentJob === false ? "show" : "hide" }`}
//                         style={{ visibility : this.state.isPresentJob ? "hidden" : "visible" }}
//                     >
//                         <label 
//                             className="sform-group__label">
//                             { name === 'startDate' ? "Start Date" : "End Date" }
//                         </label>
//                         <div className="sform-group__input--date">
//                             <DatePicker                       
//                                 selected={ values[ name ] || null }
//                                 onChange={ date => this.handleChange(date, { 
//                                     setFieldValue, setFieldTouched, name 
//                                 })}
//                                 // ???
//                                 peekNextMonth
//                                 showMonthDropdown
//                                 showYearDropdown
//                                 // for future plans
//                                 // minDate={ moment() }
                                
//                                 // for birth dacy check
//                                 // for carrier or experiences
//                                 maxDate={ moment() }
//                                 dropDownMode="select"
//                             />
//                         </div>
//                         {
//                             (!type && errors[ name ] && touched[ name ]) && <div className="sform-group__error error">
//                                     { errors[ name ] }
//                             </div>
//                         }
//                     </div>)       
//                 }
                
//             </Fragment>

//  */