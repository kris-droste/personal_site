import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addParagraph } from '../../actions/paragraph';

const initialState = {
  priority: '',
  content: '',
};

const ParagraphForm = ({ addParagraph }) => {
  const [ formData, setFormData ] = useState(initialState);
  useEffect(() => {
    setFormData({ ...initialState });
  }, []);

  const {
    priority,
    content
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addParagraph(formData);
    window.location.href = '/paragraphs';
  };

  return (
    <div className='paragraph-form'>
      <div>
        <h1 className='page-header'>Add Paragraph</h1>
        <Link to='/paragraphs'>
          <button className='btn btn-dark'>Go Back</button>
        </Link>
      </div>
      <form
        className='form my-1'
        onSubmit={onSubmit}
      >
        <div className='form-group'>
          <label htmlFor='priority'>Paragraph Position: </label>
          <input
            min='0'
            max='100'
            type="number"
            name="priority"
            value={priority}
            onChange={onChange}
          />
        </div>
        <label htmlFor='content'>Text: </label>
        <textarea
          name='content'
          cols='30'
          rows='20'
          placeholder=''
          value={content}
          onChange={onChange}
          required
        />
        <input type='submit' className='btn btn-success my-1' value='Submit' />
      </form>
    </div>
  );
};

ParagraphForm.propTypes = {
  addParagraph: PropTypes.func.isRequired
};

export default connect(
  null,
  { addParagraph }
)(ParagraphForm);
