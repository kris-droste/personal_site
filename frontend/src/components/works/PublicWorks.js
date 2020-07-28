import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWorks } from '../../actions/work';

const PublicWorks = ({ getWorks, work: { works } }) => {
  useEffect(() => {
    getWorks();
  }, [getWorks]);

  return (
    <Fragment>
      <div>
        <h1 className='page-header'>Referenced Works</h1>
      </div>
      <div className='works'>
        {works.map((work) => (
          <a key={work._id} target='_blank' className='btn' href={work.url}>{work.displayedText}</a>
        ))}
      </div>
    </Fragment>
  );
};

PublicWorks.propTypes = {
  getWorks: PropTypes.func.isRequired,
  work: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  work: state.work
});

export default connect(mapStateToProps, { getWorks })(PublicWorks);
