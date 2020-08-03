import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addWork } from '../../actions/work';

const initialState = {
  url: '',
  displayedText: '',
};

const WorkForm = ({ addWork }) => {
  const [ formData, setFormData ] = useState(initialState);
  useEffect(() => {
    setFormData({ ...initialState });
  }, []);

  const {
    url,
    displayedText
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addWork(formData);
    window.location.href = '/works';
  };

  return (
    <div className='work-form'>
      <div>
        <h1 className='page-header'>Add Work</h1>
        <Link to='/works'>
          <button className='btn btn-dark'>Go Back</button>
        </Link>
      </div>
      <form
        className='form'
        onSubmit={onSubmit}
      >
        <div className='form-group'>
          <label htmlFor="url">URL: </label>
          <input
            type='text'
            name='url'
            value={url}
            onChange={onChange}
          />
          <label htmlFor='displayedText'>displayedText: </label>
          <input
            type='text'
            name='displayedText'
            value={displayedText}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='btn btn-success' value='Submit' />
      </form>
    </div>
  );
};

WorkForm.propTypes = {
  addWork: PropTypes.func.isRequired
};

export default connect(
  null,
  { addWork }
)(WorkForm);
