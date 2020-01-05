import { Button, FormGroup, Label, Input } from 'reactstrap';

// [ IMPORTANT ]: INPUT Tag and others from css lib can be used insdie of Formik
const PortFolioInputs = ({
    field,
    form: { touched, errors },
    ...props
}) => {
    // [ IMPORTANT ]: 
    //  1) "field" includes event function of <input />
    //  2) "name" and "value" fields
    // console.log(props)
    
    // [ IMPORTANT ]
    // 1) props: cutomized value in the parents includint type, label 
    return (
        <FormGroup>
            <Label>{ props.label.toUpperCase() }</Label>
            <Input { ...field } { ...props } />
            {
                touched[ field.name ] &&
                    errors[ field.name ] && <div className="error">
                        { errors[ field.name ] }
                    </div>
            }
        </FormGroup>
    );
};

export default PortFolioInputs;