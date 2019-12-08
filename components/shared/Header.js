import React from 'react';
import Link from 'next/link';

export default class Header extends React.Component {
  render() {

    return (
      <React.Fragment>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/portfolio">
          <a>Portfolio</a>
        </Link>
        <Link href="/blogs">
          <a>Blog</a>
        </Link>
        <Link href="/cv">
          <a>CV</a>
        </Link>                  
      </React.Fragment>      
    );
  }
}
