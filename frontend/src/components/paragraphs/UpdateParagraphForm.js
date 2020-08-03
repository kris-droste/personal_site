import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateParagraph } from '../../actions/paragraph';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const initialState = {
  priority: '',
  content: '',
};

const UpdateParagraphForm = (props) => {
  const [ formData, setFormData ] = useState(initialState);
  const paragraphId = props.match.params.id;
  const paragraphs = props.paragraphs.paragraphs;


  useEffect(() => {
    const selectedParagraph = paragraphs.find(p => p._id === paragraphId);
    setFormData(selectedParagraph);
  }, [paragraphId, paragraphs]);

  const {
    priority,
    content
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    // updateParagraph(paragraphId, formData);

    try {
      await api.put(`/paragraphs/${paragraphId}`, { data: formData });
    } catch (err) {
      console.log('res: ', err);
    }

    window.location.href = '/paragraphs';
  };

  return (
    <div className='paragraph-form'>
      <div>
        <h1 className='page-header'>Update Paragraph</h1>
        <Link to='/paragraphs'>
          <button className='btn btn-dark'>Go Back</button>
        </Link>
      </div>
      <form
        className='form'
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <input
            type="number"
            name="priority"
            value={priority}
            onChange={onChange}
          />
        </div>
        <textarea
          name='content'
          cols='30'
          rows='20'
          placeholder=''
          value={content}
          onChange={onChange}
          required
        />
        <input type='submit' className='btn btn-success' value='Submit' />
      </form>
    </div>
  );
};

UpdateParagraphForm.propTypes = {
  updateParagraph: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  paragraphs: state.paragraph,
});

export default connect(
  mapStateToProps,
  { updateParagraph }
)(UpdateParagraphForm);
