import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParagraphs } from '../../actions/paragraph';

const Landing = ({ isAuthenticated, getParagraphs, paragraph: { paragraphs } }) => {
  useEffect(() => {
    getParagraphs();
  }, [ getParagraphs ]);

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
          <div className=''>
            <Link to='/publicWorks' className='btn btn-primary'>
              Other Works
            </Link>
            <Link to='/todo' className='btn btn-light'>
              Works in Progress ...
            </Link>
          </div>
          <div className='landing-text'>
            <br></br>
            <div className="infos">
            {paragraphs.sort((a, b) => (a.priority > b.priority) ? 1 : -1).map(p => (
              <p key={p._id}>{p.content}</p>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  getParagraphs: PropTypes.func.isRequired,
  paragraph: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  paragraph: state.paragraph
});

export default connect(mapStateToProps, { getParagraphs })(Landing);
