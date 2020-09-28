import React, { useState } from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CrossCheckSession, Task } from '../../models/data-models';
import {
  Modal,
  Button,
  Form,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
} from 'antd';
import { createSession } from '../../actions/actions';

interface CreateSessionProps {
  tasks: Task[];
}

const CreateSession = ({ tasks }: CreateSessionProps): JSX.Element => {
  type AppDispatch = ThunkDispatch<Task, void, AnyAction>;

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields([
        'task',
        'desiredReviews',
        'minReviews',
        'start',
        'end',
        'coef',
      ]);
      const newSession: CrossCheckSession = {
        state: values.draft ? 'DRAFT' : 'REQUESTS_GATHERING',
        taskId: values.taskId,
        startDate: values.start,
        endDate: values.end,
        discardMinScore: false,
        discardMaxScore: false,
        minReiewsAmount: values.minReviews,
        desiredReviewersAmount: values.desiredReviews,
        coefficient: values.coef !== undefined ? values.coef : 1,
        attendees: [],
      };

      dispatch(createSession(newSession));
      history.push('/sessions');

      setVisible(false);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const tasksList = Object.values(tasks)
    .map((task: Task) => {
      return {
        id: task.id,
        title: task.title,
        state: task.state,
      };
    })
    .filter((task) => task.state === 'PUBLISHED');

  const tasksOptions: JSX.Element[] = tasksList.map((taskItem) => {
    return (
      <Select.Option value={taskItem.id} key={taskItem.id}>
        {taskItem.title}
      </Select.Option>
    );
  });

  return (
    <div>
      <Button onClick={showModal} type="primary" className="create-btn">
        Add session
      </Button>
      <Modal
        title="Create Session"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name="dynamic_rule">
          <Form.Item
            label="Task:"
            name="task"
            rules={[{ required: true, message: 'Please choose task' }]}
          >
            <Select>{tasksOptions}</Select>
          </Form.Item>

          <Form.Item
            label="Start date"
            name="start"
            rules={[{ required: true, message: 'Please input start date.' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="end"
            label="End date "
            rules={[{ required: true, message: 'Please input start date.' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item label="Coefficient" name="coef">
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="minReviews"
            label="Min reviews amount"
            rules={[
              { required: true, message: 'Please input min reviews amount.' },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="desiredReviews"
            label="Desired reviewers Amount"
            rules={[
              { required: true, message: 'Please input desired reviews.' },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name="draft" valuePropName="draft">
            <Checkbox>Save as draft</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateSession;
