import React from 'react';
import Helmet from 'react-helmet';

const SEO = ({ title, metas=[], children, ...rest }) => {
  return (
    <Helmet title={title||''} meta={metas} {...rest} />
  )
}

export default SEO;
