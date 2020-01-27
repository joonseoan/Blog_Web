
// [ IMPORTANT ]: INPUT Tag and others from css lib can be used insdie of Formik
const PortFolioInputs = ({
    field,
    form: { touched, errors },
    ...props
}) => {

    // [ IMPORTANT ]: 
    //  1) "field" includes event function of <input />
    //  2) "name" and "value" fields
    
    // [ IMPORTANT ]
    // 1) props: cutomized value in the parents includint type, label 
    // console.log(props)

    return (
        <div className="sform-group">
            <label className="sform-group__label">{ props.label }</label>
            {
                props.type === 'textarea' 
                    ? <textarea className="sform-group__input" 
                        { ...field } 
                        { ...props } />
                    : <input className="sform-group__input" 
                         { ...field } 
                         { ...props } />
            }
            {
                touched[ field.name ] &&
                    errors[ field.name ] && <div className="sform-group__error error">
                        { errors[ field.name ] }
                    </div>
            }
        </div>
    );
};

export default PortFolioInputs;