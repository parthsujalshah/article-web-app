import React from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import CustomForm from '../components/Form';

class ArticleDetail extends React.Component {
  state = {
    article: {}
  }

  componentDidMount() {
    const articleID = this.props.match.params.articleID; // gets the id from url
    axios.get(`http://localhost:8000/api/${articleID}`)
      .then(res => {
        this.setState({ article: res.data })
      })
      .catch(err => console.log(err))
  };

  handleDelete = event => {
    const articleID = this.props.match.params.articleID; // gets the id from url
    axios.delete(`http://localhost:8000/api/${articleID}`);
    this.props.history.push('/');
    this.forceUpdate(); //forces page to reload
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

export default ArticleDetail;