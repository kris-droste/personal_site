import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Kristian Droste</h1>
          <p className='lead'>
            Writer. Artist. Educator.
          </p>
          <div className='buttons'>
            <Link to='/works' className='btn btn-primary'>
              Other Works
            </Link>
            <Link to='/todo' className='btn btn-light'>
              Works in Progress ...
            </Link>
          </div>
          <div className='landing-text'>
            <br></br>
            <p>
              Kristian Droste is an emerging poet and author seeking publication for his debut collection of poetry, Abstract americana. He is currently at work on his fiction debut, a bardic novella, which sheds a historically justified yet ironic light on the ferocity with which U.S. academic institutions have implemented Title IX policies in the past decade. The story takes its inspiration from classical epic poems, such as Ovid’s Metamorphoses, and is in turns sympathetic and satirical. At once, it addresses the failure of American society to protect all of its citizens equally and critiques a culture that rewards distortion of the truth.
            </p>
            <p>
              Droste has taught literature, creative writing, and ethics at the primary, secondary, and post-secondary levels. In addition, he has directed the wilderness program at an independent school in New Hampshire. He is a native of New England but has found home across the United States, from its interior wildernesses to its most volatile borderlands. Kristian holds a degree in economics from a tiny college in the Pacific Northwest.
            </p>
            <p>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
