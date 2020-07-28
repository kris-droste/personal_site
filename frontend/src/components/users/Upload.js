import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Upload = () => {

  return (
    <Fragment>
      <div className=''>
        <h1 className='page-header'>Replace Landing Page Image</h1>
        <div className='fileUpload'>
          <form
            target='emptyIFrame'
            className=''
            action='/upload'
            method='POST'
            encType='multipart/form-data'>
            <div className=''>
              <input
                type='file'
                name='myImage'
                className='custom-file-input'
              />
            </div>
            <div className=''>
              <button type='submit' className='btn btn-primary'>Upload Image</button>
              <Link to='/dashboard' className='btn btn-light'>Save Image</Link>
            </div>
          </form>
          <iframe className='emptyIFrame' title='Image Upload' name='emptyIFrame'></iframe>
        </div>
      </div>
    </Fragment>
  );
};


const mapStateToProps = () => ({
  foo: []
});

export default connect(mapStateToProps)(Upload);
