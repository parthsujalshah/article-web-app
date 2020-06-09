import React from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import CustomForm from '../components/Form';
import { connect } from 'react-redux';

class ArticleDetail extends React.Component {
  state = {
    article: {}
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${newProps.token}`
      }
      const articleID = this.props.match.params.articleID; // gets the id from url
      axios.get(`http://localhost:8000/api/${articleID}/`)
        .then(res => {
          this.setState({ article: res.data })
        })
        .catch(err => console.log(err))
    }
  };

  handleDelete = event => {
    if (this.props.token !== null) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: this.props.token
      }
      const articleID = this.props.match.params.articleID; // gets the id from url
      axios.delete(`http://localhost:8000/api/${articleID}/delete/`);
      this.props.history.push('/');
      this.forceUpdate(); //forces page to reload
    } else {
      // show some message
    }
  };

  render() {
    return (
      <div>
        <Card title={this.state.article.title}>
          <p>{this.state.article.content}</p>
        </Card>
        <br />
        <br />
        <CustomForm requestType='put' articleID={this.props.match.params.articleID} btnText="Update" />
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">Delete</Button>
        </form>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(ArticleDetail);