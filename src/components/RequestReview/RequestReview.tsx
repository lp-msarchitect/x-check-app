import React from 'react';
import { Select } from 'antd';
import { Task } from '../../models/data-models';

const { Option } = Select;

export interface RequestReviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tasks: Task[];
}

const RequestReview = (props: RequestReviewProps): JSX.Element => {
  //   const { tasks } = props;

  // Mock data
  const tasks = [
    {
      id: 'simple-task-v1',
      title: 'Simple task v1',
      author: 'cardamo',
      state: 'DRAFT',
      categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
      items: [
        {
          id: 'basic_p1',
          minScore: 0,
          maxScore: 20,
          category: 'Basic Scope',
          title: 'Basic things',
          description: 'You need to make things right, not wrong',
        },
        {
          id: 'extra_p1',
          minScore: 0,
          maxScore: 30,
          category: 'Extra Scope',
          title: 'More awesome things',
          description: 'Be creative and make up some more awesome things',
        },
        {
          id: 'fines_p1',
          minScore: -10,
          maxScore: 0,
          category: 'Fines',
          title: 'App crashes',
          description: 'App causes BSoD!',
        },
      ],
    },
    {
      id: 'simple-task-v2',
      title: 'Simple task v2',
      author: 'test',
      state: 'PUBLISHED',
      categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
      items: [
        {
          id: 'basic_p1',
          minScore: 0,
          maxScore: 20,
          category: 'Basic Scope',
          title: 'Basic things',
          description: 'You need to make things right, not wrong',
        },
        {
          id: 'extra_p1',
          minScore: 0,
          maxScore: 30,
          category: 'Extra Scope',
          title: 'More awesome things',
          description: 'Be creative and make up some more awesome things',
        },
        {
          id: 'extra_p2',
          minScore: 0,
          maxScore: 50,
          category: 'Extra Scope',
          title: 'Even more awesome things',
          description: 'Be creative and make up some more awesome things',
        },
        {
          id: 'fines_p1',
          minScore: -10,
          maxScore: 0,
          category: 'Fines',
          title: 'App crashes',
          description: 'App causes BSoD!',
        },
      ],
    },
  ];

  const tasksOptions: JSX.Element[] = tasks.map((task) => {
    return <Option value={task.id}>{task.title}</Option>;
  });

  const changeTaskValue = () => {};

  return (
    <div>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={changeTaskValue}
      >
        {tasksOptions}
      </Select>
    </div>
  );
};

export default RequestReview;
