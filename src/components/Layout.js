import React from "react";
import PropTypes from "prop-types";
import GlobalStyle from "../styles/Global";

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
