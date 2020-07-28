import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ParagraphItem from './ParagraphItem';
import { getParagraphs } from '../../actions/paragraph';

const Paragraphs = ({ getParagraphs, paragraph: { paragraphs } }) => {
  useEffect(() => {
    getParagraphs();
  }, [getParagraphs]);

  return (
    <Fragment>
      <div>
        <h1 className='page-header'>Paragraphs</h1>
        <Link to='/create-paragraph'>
          <button className='btn btn-primary'>
            Add Paragraph
          </button>
        </Link>
      </div>
      <div className="paragraphs">
        {paragraphs.sort((a, b) => (a.priority > b.priority) ? 1 : -1).map((paragraph) => (
          <ParagraphItem key={paragraph._id} paragraph={paragraph} />
        ))}
      </div>
    </Fragment>
  );
};

Paragraphs.propTypes = {
  getParagraphs: PropTypes.func.isRequired,
  paragraph: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  paragraph: state.paragraph
});

export default connect(mapStateToProps, { getParagraphs })(Paragraphs);
