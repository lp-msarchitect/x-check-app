import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Task } from '../../models/data-models';

export interface RequestReviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tasks: Task[];
}

const RequestReview = (props: RequestReviewProps): JSX.Element => {
  const { tasks } = props;

  const tasksOptions: JSX.Element[] = tasks.map((task) => {
    return <Select.Option value={task.id}>{task.title}</Select.Option>;
  });

  const onFinish = (values: object): void => {
    console.log(values);
  };

  return (
    <Form
      // {...formItemLayout}
      name="request-review"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item label="Task:" name="task" rules={[{ required: true }]}>
        <Select>{tasksOptions}</Select>
      </Form.Item>
      <Form.Item
        label="PR URL:"
        name="pr-url"
        rules={[{ required: true, type: 'url' }]}
      >
        <Input placeholder="https://github.com/user/repo/pull/1" />
      </Form.Item>
      <Form.Item
        label="Demo URL:"
        name="demo-url"
        rules={[{ required: true, type: 'url' }]}
      >
        <Input placeholder="http://mysite.com" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RequestReview;
