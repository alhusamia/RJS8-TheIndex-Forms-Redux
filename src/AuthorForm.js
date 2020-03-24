import React, { Component } from "react";
import { connect } from "react-redux";

import { postAuthor, resetErrors } from "./redux/actions/index";

class AuthorForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    imageUrl: "",
    books: []
  };

  textChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  submitAuthor = event => {
    event.preventDefault();
    this.props.postAuthor(this.state, this.props.closeModal);
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitAuthor}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={this.state.first_name}
              onChange={this.textChangeHandler}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Last Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={this.state.last_name}
              onChange={this.textChangeHandler}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Image URL</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.textChangeHandler}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errorsState.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postAuthor: (newAuthor, closeModal) =>
      dispatch(postAuthor(newAuthor, closeModal)),
    resetErrors: () => dispatch(resetErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorForm);
