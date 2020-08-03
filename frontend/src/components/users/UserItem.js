import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/user';

const UserItem = ({
  deleteUser,
  auth,
  user: { _id, name, email },
  showActions
}) => (
  <div className='container-box bg-white'>
      <div>
        {!showActions && (
          <Link to={`/users/update/${_id}`}>
            <button className='btn btn-primary'>
              Edit User
            </button>
          </Link>
        )}
      <button onClick={() => deleteUser(_id)}
        className='btn btn-danger'
      >
        Delete User
      </button>
    </div>
    <div className='item-div'>
      <p>User's Name: {name}</p>
      <p>User's Email: {email}</p>
      <p>User's Password: ******</p>
    </div>
  </div>
);

UserItem.defaultProps = {
  showActions: true
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteUser }
)(UserItem);
