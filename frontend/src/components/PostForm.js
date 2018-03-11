import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { uploadPost, fetchCategories, editPost } from '../actions';
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
  <input className="form-control text-center" {...input} type="text" />
));

const RenderBody = createRenderer((input, label) => (
  <textarea className="form-control text-center" {...input} type="text" />
));

const RenderSelect = createRenderer((input, label, { children }) => (
  <select {...input}>{children}</select>
));

class PostForm extends Component {
  componentDidMount() {
    this.props.fetchCat();
    if (this.props.location.state) {
      this.handleInitialize();
    }
  }

  handleInitialize() {
    const initData = {
      author: this.props.location.state.post.author,
      title: this.props.location.state.post.title,
      body: this.props.location.state.post.body,
      category: this.props.location.state.post.category
    };
    this.props.initialize(initData);
  }
  render() {
    const {
      handleSubmit,
      submitting,
      addPost,
      editPost,
      history,
      categories
    } = this.props;
    return (
      <form
        onSubmit={handleSubmit(values => {
          let date = Date.now();

          values.timestamp = date;
          

          if (this.props.location.state) {
            editPost(values, this.props.location.state.post.id);
            history.push(`/post/${this.props.location.state.post.id}`);
          } else {
            values.id = date;
            addPost(values);
            history.push('/');
          }
        })}
      >
        <Field name="author" label="Author" component={RenderInput} />
        <Field name="title" label="Title" component={RenderInput} />
        <Field name="body" label="Body" component={RenderBody} />
        <Field name="category" label="Category" component={RenderSelect}>
          <option />
          {categories != null &&
            categories.map(category => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
        </Field>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            Submit
          </button>
          {this.props.location.state ? (
            <Link to={`/post/${this.props.location.state.post.id}`}>
              <button style={{ marginLeft: '5px' }} className="btn btn-danger">
                Cancel
              </button>
            </Link>
          ) : (
            <Link to="/">
              <button style={{ marginLeft: '5px' }} className="btn btn-danger">
                Cancel
              </button>
            </Link>
          )}
        </div>
      </form>
    );
  }
}

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
  if (!values.category) {
    errors.category = "If you don't know, choose other!";
  }
  return errors;
}

PostForm = reduxForm({
  // a unique name for the form
  form: 'newPost',
  validate
})(PostForm);

const mapStateToProps = state => {
  return { categories: state.categoryReducer.categories };
};

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(uploadPost(post)),
    editPost: (post, id) => dispatch(editPost(post, id)),
    fetchCat: () => dispatch(fetchCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
