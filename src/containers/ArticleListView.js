import React from 'react';
import Articles from '../components/Article';
import axios from 'axios';
import CustomForm from '../components/Form';
import { connect } from 'react-redux';

class ArticleList extends React.Component {
  state = {
    articles: []
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${newProps.token}`
      }
      axios.get('http://localhost:8000/api/')
        .then(res => {
          this.setState({ articles: res.data });
          console.log(axios.defaults.headers)
        })
        .catch(err => console.log(err))
    }
  };

  render() {
    return (
      <div>
        <Articles data={this.state.articles} />
        <br />
        <h2>Create an  Article</h2>
        <CustomForm requestType='post' articleId={null} btnText="Create" />
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(ArticleList);