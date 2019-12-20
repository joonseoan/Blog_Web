import { Container } from 'reactstrap';

const BasePage = props => {
  
  // [IMPORTANT: ]
  // className is also props!!!!!!
  // const { className } = props;
  // console.log('props in BasePage: ', props);

  const { className, title } = props;
  
  return(
    <div className={`base-page ${ props.className }`}>
    {/* <div className={`base-page ${ className || '' }`}> */}
      <Container>
        { title && <div className="page-header">
            <h1 className="page-header__title">{ title }</h1>
        </div>}
        { props.children }
      </Container>
    </div>
  );
}

// Way to unsderstand props in Legacy React
// However, it is much readable when we need to define "undefined" or "empty props"
//  that depends on the parent.
BasePage.defaultProps = {
  className:''
}

export default BasePage;
