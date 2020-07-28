import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PoemItem from '../poems/PoemItem';
import CommentForm from '../poem/CommentForm';
import CommentItem from '../poem/CommentItem';
import { getPoem } from '../../actions/poem';

const Poem = ({ getPoem, poem: { poem, loading }, match }) => {
  useEffect(() => {
    getPoem(match.params.id);
  }, [getPoem, match.params.id]);

  return loading || poem === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/poems" className="btn">
        Back To Poems
      </Link>
      <PoemItem poem={poem} showActions={false} />
      <CommentForm poemId={poem._id} />
      <div className="comments">
        {poem.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} poemId={poem._id} />
        ))}
      </div>
    </Fragment>
  );
};

Poem.propTypes = {
  getPoem: PropTypes.func.isRequired,
  poem: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  poem: state.poem
});

export default connect(mapStateToProps, { getPoem })(Poem);
