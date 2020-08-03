import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage } from '../../actions/message';


const initialState = {
  senderName: '',
  senderEmail: '',
  subject: '',
  content: ''
};

const MessageForm = ({ addMessage }) => {
  const [ formData, setFormData ] = useState(initialState);
  useEffect(() => {
    setFormData({ ...initialState });
  }, []);

  const {
    senderName,
    senderEmail,
    subject,
    content
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addMessage(formData);
    window.location.href = '/';
  };

  return (
    <div className='avDiv'>
      <h1 className='page-header'>Compose Message</h1>
      <form
        className='form'
        onSubmit={onSubmit}
      >
        <div className='form-group'>
          <label htmlFor='senderName'>Your Name: </label>
          <input
            type='text'
            placeholder='John Doe'
            name='senderName'
            value={senderName}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='senderEmail'>Your Email: </label>
          <input
            type='text'
            placeholder='john@gmail.com'
            name='senderEmail'
            value={senderEmail}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='subject'>Subject: </label>
          <input
            type='text'
            placeholder='Hello'
            name='subject'
            value={subject}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Message: </label>
          <textarea
            name='content'
            cols='30'
            rows='20'
            placeholder='Craft your message'
            value={content}
            onChange={onChange}
            required
          />
        </div>
        <input type='submit' className='btn btn-dark' value='Submit' />
      </form>
    </div>
  );
};

MessageForm.propTypes = {
  addMessage: PropTypes.func.isRequired
};

export default connect(
  null,
  { addMessage }
)(MessageForm);
