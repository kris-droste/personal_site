import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Dashboard = ({
  auth: { user },
}) => {
  useEffect(() => {
  }, []);

  return (
    <Fragment>
      <div className='flex-container'>
        <h1 className='page-header'>Dashboard</h1>
        <div className=''>
          <Link to='/upload'>
            <button className='btn btn-default'>Upload Image</button>
          </Link>
          <Link to='/works'>
            <button className='btn btn-default'>Works</button>
          </Link>
        </div>
      </div>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>

    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { })(
  Dashboard
);
