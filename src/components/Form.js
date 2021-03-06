import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CustomForm = props => {

  const onFinish = (values) => {
    const title = values.title;
    const content = values.content;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`
    }
    switch (props.requestType) {
      case 'post':
        return axios.post('http://127.0.0.1:8000/api/create/', {
          title: title,
          content: content
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
      case 'put':
        return axios.put(`http://127.0.0.1:8000/api/${props.articleID}/update/`, {
          title: title,
          content: content
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
    };
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        // remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input your title!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
            message: 'Please input your content!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {props.btnText}
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(CustomForm);