import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import WorkItem from './WorkItem';
import { getWork } from '../../actions/work';

const Work = ({ getWork, work: { work, loading }, match }) => {
  useEffect(() => {
    getWork(match.params.id);
  }, [getWork, match.params.id]);

  return loading || work === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/works" className="btn btn-dark">
        Back To All Works
      </Link>
      <WorkItem work={work} showActions={true} />
    </Fragment>
  );
};

Work.propTypes = {
  getWork: PropTypes.func.isRequired,
  work: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  work: state.work
});

export default connect(mapStateToProps, { getWork })(Work);
