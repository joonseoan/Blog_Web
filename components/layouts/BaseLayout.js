import React from 'react';
import Header from '../shared/Header';

const BaseLayout = (props) => {
  
  const { className, children, isAuthenticated, user, headerType } = props;
  console.log('className in BaseLayout Comp: ', className);

  return (
    <div className="layout-container">
      <Header className={`port-nav-${ headerType || 'default' }`} isAuthenticated={ isAuthenticated } user={ user }/>)
      <main className={`cover ${ className }`}>
        <div className="wrapper">
          {/* BasePage */}
          { children }
        </div>
      </main>
    </div>
  )
}

BaseLayout.defaultProps={
  className: '',
  // headerType: 'default'
}

export default BaseLayout;

