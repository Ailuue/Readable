import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { uploadPost, fetchCategories } from '../actions';
import { Link } from 'react-router-dom';

const createRenderer = render => ({ input, meta, label, ...rest }) => (
  <div className="form-group">
    <div
      className={[
        meta.error && meta.touched ? 'error' : '',
        meta.active ? 'active ' : ''
      ].join(' ')}
    >
      <label className="alert">{label}</label>
      {render(input, label, rest)}
      {meta.error &&
        meta.touched && <span className="alert-danger">{meta.error}</span>}
    </div>
  </div>
);

const RenderInput = createRenderer((input, label) => (
  <input
    className="form-control text-center"
    {...input}
    type="text"
    placeholder={label}
  />
));

const RenderBody = createRenderer((input, label) => (
  <textarea
    className="form-control text-center"
    {...input}
    type="text"
    placeholder={label}
  />
));

const RenderSelect = createRenderer((input, label, { children }) => (
  <select {...input}>{children}</select>
));

let CreatePost = props => {
  const { handleSubmit, submitting } = props;
  props.fetchCat();
  return (
    <form
      onSubmit={handleSubmit(values => {
        props.addPost(values);
        props.history.push('/');
      })}
    >
      <Field name="id" label="Id" component={RenderInput} />
      <Field name="author" label="Author" component={RenderInput} />
      <Field name="title" label="Title" component={RenderInput} />
      <Field name="body" label="Body" component={RenderBody} />
      <Field name="category" label="Category" component={RenderSelect}>
        <option />
        {props.categories &&
          props.categories.map(category => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
      </Field>
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  );
};

function validate(values) {
  const errors = {};

  if (!values.author) {
    errors.author = 'Who is writing this?';
  }
  if (!values.title) {
    errors.title = 'Please give your post a title!';
  }
  if (!values.body) {
    errors.body = "What's the point of a post with no content?";
  }
  return errors;
}

CreatePost = reduxForm({
  // a unique name for the form
  form: 'newPost',
  validate
})(CreatePost);

const mapStateToProps = state => {
  categories: state.categoryReducer.categories;
};

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(uploadPost(post)),
    fetchCat: () => dispatch(fetchCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
