import React, { Component } from "react";
import InputColor from "react-input-color";
import { connect } from "react-redux";
import { postBook, resetErrors } from "./redux/actions/index";

class BookForm extends Component {
  state = {
    title: "",
    color: "",
    authors:[this.props.author.id]
  };
  textChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  changeColor(e) {
    this.setState({
      color: e.target.value
    });
  }
  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  submitBook = event => {
    event.preventDefault();
    this.props.postBook(this.state, this.props.closeModal);
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Book Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              value={this.state.title}
              onChange={this.textChangeHandler}
            />
          </div>
          <div>
            <select
              style={{ color: this.state.color }}
              ref="dropDownColor"
              onChange={this.changeColor.bind(this)}
              value={this.state.color}
            >
              <option>Color</option>
              <option value="aqua" style={{ color: "aqua" }}>
                Blue
              </option>
              <option value="red" style={{ color: "red" }}>
                Red
              </option>
              <option value="orange" style={{ color: "orange" }}>
                Orange
              </option>
              <option value="green" style={{ color: "green" }}>
                Greed
              </option>
            </select>
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
    postBook: (newBook, closeModal) =>
      dispatch(postBook(newBook, closeModal)),
    resetErrors: () => dispatch(resetErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
