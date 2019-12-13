import React from 'react';
import Header from '../shared/Header';

const BaseLayout = (props) => {

  const { className, children, isAuthenticated, user } = props;
  console.log('props in header: ',  props)
  
  return (
    <div className="layout-container">
      <Header isAuthenticated={ isAuthenticated } user={ user }/>
      <main className={`cover ${className}`}>
        <div className="wrapper">
          {/* BasePage */}
          { children }
        </div>
      </main>
    </div>
  )
}

export default BaseLayout;

