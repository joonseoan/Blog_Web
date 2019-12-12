import React from 'react';
import Header from '../shared/Header';

const BaseLayout = (props) => {

  const { className, children, isAuthenticated } = props;

  console.log('isAuthenticated for header: ',  isAuthenticated)
  return (
    <div className="layout-container">
      <Header isAuthenticated={ isAuthenticated }/>
      <main className={`cover ${className}`}>
        <div className="wrapper">
          {/* BasePage */}
          { children  }
        </div>
      </main>
    </div>
  )
}

export default BaseLayout;

