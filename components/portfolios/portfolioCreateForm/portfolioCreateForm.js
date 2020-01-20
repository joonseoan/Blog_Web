import React from 'react';
import { Formik, Form, Field } from 'formik';

import PortFolioInputs from '../../form/portfolioInputs';
import PortfolioDate from '../../form/portfolioDate';

const portfolioFields = {
    title: '',
    company: '',
    location: '',
    position: '',
    description: '',
    startDate: '',
    endDate: ''
};

const validateInputs = values => {
    let errors = {};

    // [IMPORTANT - New object to Array!!! ]
    // console.log('Should know this: ', Object.entries(values));
    /* 
        [ Outside Array ]
        [
            [Nested Array]
            Key and Vaue in an array
            0: (2) ["title", ""]
            1: (2) ["company", ""]
            2: (2) ["location", ""]
            3: (2) ["position", ""]
            4: (2) ["description", ""]
            5: (2) ["startDate", ""]
            6: (2) ["endDate", ""]
        ]
     */
    
    // Object.entries(values).forEach(([key, value])=> {
    //     console.log('key: ', key, 'value: ', value)
    // })


    // [ IMPORTANT ]
    // object to array only with keys
    Object.keys(values)
        .forEach(valueKey => {
            if(!values[valueKey] && valueKey !== 'endDate') {
                errors[valueKey] = `${valueKey} is Required.`
            }
        });

    const startDate = values.startDate;
    const endDate = values.endDate;

    if(startDate && endDate && !startDate.isBefore(endDate)) {
        errors['endDate'] = "end date cannot before start date!";
    }   

    return errors;
};

const PORTFOLIO_INPUTS = [
    {
        type: 'text',
        placeholder: 'Title',
        name: 'title'
    }, 
    {
        type: 'text',
        placeholder: 'Company',
        name: 'company'
    }, 
    {
        type: 'text',
        placeholder: 'Location',
        name: 'location'
    }, 
    {
        type: 'text',
        placeholder: 'Position',
        name: 'position'
    }, 
    {
        type: 'textarea',
        placeholder: 'Description',
        name: 'description'
    }, 
    {
        type: 'checkbox',
        name: 'present'
    },
    {
        name: 'startDate'
    }, 
    {
        name: 'endDate'
    }
];

const renderInputField = () => {
    return PORTFOLIO_INPUTS.map((input, index) => {
        if(input.name !== 'startDate' && 
           input.name !== 'endDate' && 
           input.name !== 'present') {
                return(
                    <Field
                        key={ index }
                        type={ input.type }
                        label={ input.name }
                        placeholder={ input.placeholder }
                        name={ input.name }
                        component={ PortFolioInputs }
                    />
                );
        } else {
            return(
                <Field
                    key={ index }
                    type={ input.type || undefined }
                    label={ input.name }
                    name={ input.name }
                    component={ PortfolioDate }
                />
            );
        }
    })
}

const PortfolioCreateForm = props => (    
    
    <Formik
        initialValues={ portfolioFields }
        validate={ validateInputs }
        onSubmit={ (values, { setSubmitting }) => {
            props.savePortfolio(values);
            setSubmitting(false);
        }}
    >
        { ({ isSubmitting, values }) => (
            <Form className="sport__create__form">
                { renderInputField() }
                <button className="sbtn" type="submit" disabled={ isSubmitting }>
                    Create
                </button>    
            </Form>
            )
        }
    </Formik>
    
)

export default PortfolioCreateForm;


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
