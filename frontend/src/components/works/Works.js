import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WorkItem from './WorkItem';
import { getWorks } from '../../actions/work';

const Works = ({ getWorks, work: { works } }) => {
  useEffect(() => {
    getWorks();
  }, [getWorks]);

  return (
    <Fragment>
      <div>
        <h1 className='page-header'>Works</h1>
        <Link to='/create-work'>
          <button className='btn btn-primary'>
            Add Work
          </button>
        </Link>
      </div>
      <div className="works">
        {works.map((work) => (
          <WorkItem key={work._id} work={work} />
        ))}
      </div>
    </Fragment>
  );
};

Works.propTypes = {
  getWorks: PropTypes.func.isRequired,
  work: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  work: state.work
});

export default connect(mapStateToProps, { getWorks })(Works);
