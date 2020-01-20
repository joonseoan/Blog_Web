
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

    console.log(props)

    return (
        <div className="sform-group">
            {
                props.type === 'textarea' 
                    ? <textarea className="sform-group__input" { ...field } { ...props } />
                    : <input className="sform-group__input" placeholder={props.placeholder } { ...field } { ...props } />
            }
            <label className="sform-group__label">{ props.label.toUpperCase() }</label>
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