import React, { Component } from "react";

// Components
import BookTable from "./BookTable";
import AddBookModal from './AddBookModal';
import Loading from "./Loading";

import { connect } from "react-redux";

import { fetchAuthorDetail } from "./redux/actions";

class AuthorDetail extends Component {
  componentDidMount() {
    this.props.getAuthor(this.props.match.params.authorID);
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    } else {
      const { author } = this.props;
      const authorName = `${author.first_name} ${author.last_name}`;
      return (
        <div className="author">
          <div>
            <h3>{authorName}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={authorName}
            />
          </div>
          <BookTable books={author.books} />
          <AddBookModal author={author}/>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    author: state.authorState.author,
    loading: state.authorState.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuthor: authorID => dispatch(fetchAuthorDetail(authorID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetail);
