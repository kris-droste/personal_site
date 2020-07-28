import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ParagraphItem from './ParagraphItem';
import { getParagraph } from '../../actions/paragraph';

const Paragraph = ({ getParagraph, paragraph: { paragraph, loading }, match }) => {
  useEffect(() => {
    getParagraph(match.params.id);
  }, [getParagraph, match.params.id]);

  return loading || paragraph === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/paragraphs" className="btn btn-dark">
        Back To All Paragraphs
      </Link>
      <ParagraphItem paragraph={paragraph} showActions={true} />
    </Fragment>
  );
};

Paragraph.propTypes = {
  getParagraph: PropTypes.func.isRequired,
  paragraph: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  paragraph: state.paragraph
});

export default connect(mapStateToProps, { getParagraph })(Paragraph);
