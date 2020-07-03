import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPoems } from '../../actions/poem';

const Poems = ({ getPoems, poem: { poems } }) => {
  useEffect(() => {
    getPoems();
  }, [getPoems]);

  return (
    <Fragment>
      <h1 className="large text-primary">Poems</h1>
      <p className="lead">
        Work in Progress ...
      </p>
    </Fragment>
  );
};

Poems.propTypes = {
  getPoems: PropTypes.func.isRequired,
  poem: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  poem: state.poem
});

export default connect(mapStateToProps, { getPoems })(Poems);
