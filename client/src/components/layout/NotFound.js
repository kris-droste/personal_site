import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <div className='page-not-found'>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Page Coming Soon
      </h1>
      <p className='large'>Work in Progress ...</p>
      </div>

    </Fragment>
  );
};

export default NotFound;
