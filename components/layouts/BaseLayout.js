import React from 'react';
import Header from '../shared/Header';

const BaseLayout = (props) => {
  const { className, children } = props;

  return (
    <div className="layout-container">
      <Header />
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

