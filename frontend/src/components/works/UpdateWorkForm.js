import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateWork } from '../../actions/work';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const initialState = {
  url: '',
  displayedText: '',
};

const UpdateWorkForm = (props) => {
  const [ formData, setFormData ] = useState(initialState);
  const workId = props.match.params.id;
  const works = props.works.works;


  useEffect(() => {
    const selectedWork = works.find(p => p._id === workId);
    setFormData(selectedWork);
  }, [workId, works]);

  const {
    url,
    displayedText
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    // updateWork(workId, formData);

    try {
      await api.put(`/works/${workId}`, { data: formData });
    } catch (err) {
      console.log('res: ', err);
    }

    window.location.href = '/works';
  };

  return (
    <div className='work-form'>
      <div>
        <h1 className='page-header'>Update Work</h1>
        <Link to='/works'>
          <button className='btn btn-dark'>Go Back</button>
        </Link>
      </div>
      <form
        className='form my-1'
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <label htmlFor="url">URL: </label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={onChange}
          />
          <label htmlFor="displayedText">displayedText: </label>
          <input
            type="text"
            name="displayedText"
            value={displayedText}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='btn btn-success my-1' value='Submit' />
      </form>
    </div>
  );
};

UpdateWorkForm.propTypes = {
  updateWork: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  works: state.work,
});

export default connect(
  mapStateToProps,
  { updateWork }
)(UpdateWorkForm);
