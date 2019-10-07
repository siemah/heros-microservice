import React from 'react';

/**
 * custom hook to remove the current route css when user navigate to another route 
 * @author siemah
 * @version 1.0.0
 * @since 1.0.0
 * @param {object} style is provided by the context of isomorphic-style-loader package 
 * @see https://github.com/kriasoft/isomorphic-style-loader#getting-started
 */
const useRemoveCssStyle = (style) => {
  React.useEffect(() => {
    const removeCss = style._insertCss();
    removeCss();
    return () => {
      removeCss();
    }
  },  [style]);
};

export default useRemoveCssStyle;