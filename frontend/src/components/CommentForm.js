import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { uploadComment, editComment } from '../actions';
import Header from './Header';

// Redux Form standard code "Template" according to docs/demonstrations

//Html for each label/form element grouping, allowing for validation errors to display
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

//Individual renderer rules for title input
const RenderInput = createRenderer((input, label) => (
  <input className="form-control text-center" {...input} type="text" />
));

//Individual renderer rules for body input
const RenderBody = createRenderer((input, label) => (
  <textarea className="form-control text-center" {...input} type="text" />
));

class CommentForm extends Component {
  componentDidMount() {
    if (this.props.location.state) {
      this.handleInitialize();
    }
  }

  handleInitialize() {
    const initData = {
      author: this.props.location.state.comment.author,

      body: this.props.location.state.comment.body
    };
    this.props.initialize(initData);
  }

  render() {
    const {
      handleSubmit,
      submitting,
      addComment,
      editComment,
      history
    } = this.props;
    return (
      <div className="container">
        <Header />
        <form
          onSubmit={handleSubmit(values => {
            let date = Date.now();

            values.timestamp = date;
            values.parentId = this.props.match.params.id;

            if (this.props.location.state) {
              editComment(values, this.props.location.state.comment.id, () => {
                history.push(`/post/${this.props.match.params.id}`);
              });
            } else {
              values.id = date;
              addComment(values, () => {
                history.push(`/post/${this.props.match.params.id}`);
              });
            }
          })}
        >
          <Field name="author" label="Author" component={RenderInput} />
          <Field name="body" label="Body" component={RenderBody} />
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              Submit
            </button>
            <Link to={`/post/${this.props.match.params.id}`}>
              <button style={{ marginLeft: '5px' }} className="btn btn-danger">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.author) {
    errors.author = 'Who is writing this?';
  }

  if (!values.body) {
    errors.body = "What's the point of a post with no content?";
  }

  return errors;
}

//HOC for handling the redux store
CommentForm = reduxForm({
  form: 'newComment',
  validate
})(CommentForm);

const mapDispatchToProps = dispatch => {
  return {
    addComment: (comment, callback) =>
      dispatch(uploadComment(comment, callback)),
    editComment: (comment, id, callback) =>
      dispatch(editComment(comment, id, callback))
  };
};

export default connect(null, mapDispatchToProps)(CommentForm);
