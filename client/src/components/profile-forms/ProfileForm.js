import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const ProfileForm = () =>
  (<Fragment>
    <div className='page-not-found'>
      <h1 className="large text-primary">Profil Page</h1>
      <p className="lead">
          Work in Progress ...
      </p>
    </div>
    </Fragment>
  );

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
