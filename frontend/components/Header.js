import React, { useState } from 'react';
import { APP_NAME } from '../config';
import Link from 'next/link';
import NProgress from 'nprogress';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import '../node_modules/nprogress/nprogress.css';

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold" style={{ cursor: 'pointer' }}>
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {/* If they are logged in, do not show signin,signup */}
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink style={{ cursor: 'pointer' }}>Signin</NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: 'pointer' }}>Signup</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
            {/* Show User dashboard if user */}
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink style={{ cursor: 'pointer' }}>
                    {`${isAuth().name}s Dashboard`}
                  </NavLink>
                </Link>
              </NavItem>
            )}
            {/* Show admin dashboard if admin */}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink style={{ cursor: 'pointer' }}>
                    {`${isAuth().name}s Dashboard`}
                  </NavLink>
                </Link>
              </NavItem>
            )}

            {/* Show Signout only if they are signed in(isAuth()==true) */}
            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    signout(() => {
                      Router.replace(`/signin`);
                    })
                  }
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
