import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserItem from './UserItem';
import { getUsers } from '../../actions/user';

const Users = ({ getUsers, user: { users } }) => {
  useEffect(() => {
    getUsers();
  }, [ getUsers ]);

  return (
    <Fragment>
      <div>
        <h1 className='page-header'>Users</h1>
        <Link to='/register'>
          <button className='btn btn-primary'>
            Add New User
          </button>
        </Link>
      </div>
      <div className="paragraphs">
        {users.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </div>
    </Fragment>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, { getUsers })(Users);
