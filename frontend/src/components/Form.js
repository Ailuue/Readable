import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { uploadPost } from '../actions';

const createRenderer = render => ({ input, meta, label, ...rest }) => (
  <div
    className={[
      meta.error && meta.touched ? 'error' : '',
      meta.active ? 'active' : ''
    ].join(' ')}
  >
    <label>{label}</label>
    {render(input, label, rest)}
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </div>
);

const RenderInput = createRenderer((input, label) => (
  <input {...input} placeholder={label} />
));

const RenderBody = createRenderer((input, label) => (
  <textarea {...input} placeholder={label} />
));

let CreatePost = props => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit(values => props.addPost(values))}>
      {<Field name="id" label="Id" component={RenderInput} />}
      {<Field name="title" label="Title" component={RenderInput} />}
      {<Field name="body" label="Body" component={RenderBody} />}
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  );
};

CreatePost = reduxForm({
  // a unique name for the form
  form: 'newPost'
})(CreatePost);

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(uploadPost(post))
  };
};

export default connect(null, mapDispatchToProps)(CreatePost);
