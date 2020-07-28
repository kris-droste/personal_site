import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { deleteWork } from '../../actions/work';

const WorkItem = ({
  deleteWork,
  auth,
  work: { _id, url, displayedText, date },
  showActions
}) => (
  <div className='message bg-white p-1 my-1'>
    <div>
      <Link to={`works/update/${_id}`}>
        <button className='btn btn-dark'>
          Edit Work
        </button>
      </Link>
      <button
        onClick={() => deleteWork(_id)}
        className='btn btn-danger'
      >
        Delete Work
      </button>
    </div>
    <div>
      <p className=''>Date Added: <Moment format='YYYY/MM/DD'>{date}</Moment></p>
      <p className='my-1'>URL: {url}</p>
      <p>Displayed Text: {displayedText}</p>
    </div>
  </div>
);

WorkItem.defaultProps = {
  showActions: false
};

WorkItem.propTypes = {
  work: PropTypes.object.isRequired,
  deleteWork: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteWork }
)(WorkItem);
