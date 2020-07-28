import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { deleteParagraph } from '../../actions/paragraph';

const ParagraphItem = ({
  deleteParagraph,
  auth,
  paragraph: { _id, priority, content, date },
  showActions
}) => (
  <div className='message bg-white p-1 my-1'>
    <div>
      {!showActions && (
        <Link to={`/paragraphs/${_id}`}>
          <button className='btn btn-success'>
            Read Paragraph
          </button>
        </Link>
      )}
      <Link to={`paragraphs/update/${_id}`}>
        <button className='btn btn-dark'>
          Edit Paragraph
        </button>
      </Link>
      <button
        onClick={() => deleteParagraph(_id)}
        className='btn btn-danger'
      >
        Delete Message
      </button>
    </div>
      <div>
      <p className='my-1'>paragraph #: {priority}</p>
      <p className=''>Date Written: <Moment format='YYYY/MM/DD'>{date}</Moment></p>
      {!showActions && (
        <Fragment>
          <p className='my-1'>Partial Text: {content.substring(0, 50) + ' ...'}</p>
        </Fragment>
      )}
      {showActions && (
        <Fragment>
          <p>{content}</p>
        </Fragment>
      )}
    </div>
  </div>
);

ParagraphItem.defaultProps = {
  showActions: false
};

ParagraphItem.propTypes = {
  paragraph: PropTypes.object.isRequired,
  deleteParagraph: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteParagraph }
)(ParagraphItem);
