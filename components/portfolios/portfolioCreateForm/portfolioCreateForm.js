import React, { useState, Fragment } from 'react';
import { Formik, Form, Field } from 'formik';

import PortFolioInputs from '../../form/portfolioInputs';
import PortfolioDate from '../../form/portfolioDate';
import PORTFOLIO_INPUTS from '../../../helpers/portfolioInputs.json';

const portfolioFields = {
    title: '',
    company: '',
    location: '',
    position: '',
    description: '',
    startDate: '',
    endDate: ''
};

const PortfolioCreateForm = props => {

    const [ endDateTime, setEndDateTime ] = useState(true);
    const validateInputs = inputValues => {
        let errors = {};
        const { endDate, ...noA } = inputValues;
        const values = endDateTime ? inputValues : noA;

        // Object.entries(values).forEach(([key, value])=> {
        //     console.log('key: ', key, 'value: ', value)
        // })

        Object.keys(values)
            .forEach(valueKey => {
                if(!values[valueKey]) {
                    errors[valueKey] = `${valueKey} is Required.`
                }
            });

        const start = values.startDate;
        
        let end;
        if(endDateTime) {
            end = values.endDate;
        }

        // isBefore from 'moment'
        if(start && end && !start.isBefore(end)) {
            errors['endDate'] = "end date cannot before start date!";
        }   

        return errors;
    };

    const renderInputField = () => {    
        return PORTFOLIO_INPUTS.map((input, index) => {
            if(!input.date) {
                return(
                    <Field
                        key={ index }
                        type={ input.type }
                        label={ input.name }
                        name={ input.name }
                        component={ PortFolioInputs }
                    />
                );
            } else {
                return(
                    <div key={ index } 
                        className={`${input.name === "present" ? "sform-group-present" : "sform-group-date"}`} 
                        style={{ display: (input.name === 'endDate' && !endDateTime) && 'none' }}                        
                    >
                        <Field
                            key={ index }
                            type={ input.type || undefined }
                            label={ input.name }
                            name={ input.name }
                            getCheckValue={ input.name ? value => setEndDateTime(!value) : undefined }
                            component={ PortfolioDate }
                        />
                    </div>
                );
            }
        })
    }    
            
    return (
        <Formik
            initialValues={ portfolioFields }
            validate={ validateInputs }
            onSubmit={ (values, { setSubmitting, resetForm }) => {
                if(!endDateTime) { values.endDate = undefined }
                props.savePortfolio(values, { setSubmitting });
                resetForm();
                // setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="sport__create__form">
                    { renderInputField() }
                    <div className="sport__create__form--error">{ props.errorMessage }</div>
                    <button className="sbtn" type="submit" disabled={ isSubmitting }>
                        Create Profile
                    </button>    
                </Form>
            )}
        </Formik>
    );
}

export default PortfolioCreateForm;







// [Validation Reference]
// const validateInputs = values => {
//     let errors = {};

//     // [IMPORTANT - New object to Array!!! ]
//     // console.log('Should know this: ', Object.entries(values));
//     /* 
//         [ Outside Array ]
//         [
//             [Nested Array]
//             Key and Vaue in an array
//             0: (2) ["title", ""]
//             1: (2) ["company", ""]
//             2: (2) ["location", ""]
//             3: (2) ["position", ""]
//             4: (2) ["description", ""]
//             5: (2) ["startDate", ""]
//             6: (2) ["endDate", ""]
//         ]
//      */
    
//     // Object.entries(values).forEach(([key, value])=> {
//     //     console.log('key: ', key, 'value: ', value)
//     // })


//     // [ IMPORTANT ]
//     // object to array only with keys
//     Object.keys(values)
//         .forEach(valueKey => {
//             if(!values[valueKey]) {
//                 errors[valueKey] = `${valueKey} is Required.`
//             }
//         });

//     if(endDateTime) {
//         const startDate = values.startDate;
//         const endDate = values.endDate;
//         if(startDate && endDate && !startDate.isBefore(endDate)) {
//             errors['endDate'] = "end date cannot before start date!";
//         }   
//     }

//     return errors;
// };


// [ Formik 1]
// const PortforlioCreateForm = () => (
//     <div>
//         <Formik
//             initialValues={{ email: '', password: '' }}
//             validate={ values => {
//                 let errors = {};
//                 if(!values.email) {
//                     errors.email = 'Required';
//                 } else if (!values.email.includes('@')) {
//                     errors.email = 'Invalid Email';
//                 }
//                 return errors
//             }}
//             onSubmit={ (values, { setSubmitting }) => {
//                 setTimeout(() => {
//                     alert(JSON.stringify(values, null, 2));
//                     setSubmitting(false);
//                 }, 400);
//             }}
//         >
//             { ({ values, errors, touched, handleChange, 
//                  handleBlur, handleSubmit, isSubmitting }) => (

//                     <form onSubmit={ handleSubmit }>
//                         <input 
//                             type="email"
//                             name="email"
//                             onChange={ handleChange }
//                             onBlur={ handleBlur }
//                             value={ values.email }
//                         />
//                         { errors.email && touched.email && errors.email }

//                         <input 
//                             type="password"
//                             name="password"
//                             onChange={ handleChange }
//                             onBlur={ handleBlur }
//                             value={ values.password }
//                         />
//                         { errors.password && touched.password && errors.password }
                        
//                         <button type="submit" disabled={ isSubmitting }>
//                             Submit
//                         </button>
//                     </form>
//                 )
//             }
//         </Formik>
//     </div>
// );

// export default PortforlioCreateForm;


// [ Formik 2]
// class PortforlioCreateForm extends Component {

//     state = {};

//     handleOnChange = e => {
//         const { name, value } = e.target;
//         this.setState({ [name]: value });
//     }

//     handleOnSubmit = e => {
//         alert('works')
//         e.preventDefault();
//     }   

//     render() {
//         return(
//             <form onSubmit={ this.handleOnSubmit }>
//                 <label>
//                     Name:
//                     <input 
//                         type="text" 
//                         name="title"
//                         value={ this.state.title || '' }
//                         onChange={ this.handleOnChange }
//                     />
//                 </label>
//                 <label>
//                     Description:
//                     <textarea 
//                         name="description" 
//                         value={ this.state.description || '' }
//                         onChange={ this.handleOnChange }
//                     />
//                 </label>
//                 <label>
//                     Pick your Programming Language:
//                     <select 
//                         value={ this.state.language || "english" }
//                         name="language"
//                         onChange={ this.handleOnChange }
//                     >
//                         <option value="react">React</option>
//                         <option value="angular">Angular</option>
//                         <option value="vue">Vue</option>
//                         <option value="jquery">jQuery</option>
//                     </select>
//                 </label>
//                 <button type="submit">Submit</button>
//             </form>
//         )
//     }
// }

// export default PortforlioCreateForm;
