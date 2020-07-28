import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage } from '../../actions/message';

const MessageForm = ({ addMessage }) => {
  const [ formData, setFormData ] = useState({
    subject: '',
    content: '',
    senderName: '',
    senderPhone: '',
    senderEmail: ''
  });

  const { subject, content, senderName, senderPhone, senderEmail } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [ e.target.name ]: e.target.value });

    const onSubmit = async (e) => {
      e.preventDefault();
      addMessage(subject, content, senderName, senderPhone, senderEmail);
    };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1' onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Subject of Message"
          name="subject"
          value={subject}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Name"
          name="senderName"
          value={senderName}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="senderPhone"
          value={senderPhone}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="senderEmail"
          value={senderEmail}
          onChange={onChange}
        />
        <textarea
          name='content'
          cols='30'
          rows='5'
          placeholder='Send a message'
          value={content}
          onChange={onChange}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
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
