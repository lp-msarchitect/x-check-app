import React, { useState, useEffect } from 'react';
import { Collapse, Badge } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Task, TaskState } from '../../models/data-models';
import DataService from '../../services/data-service';
import SingleTask from '../SingleTask/SingleTask';
import TaskCheckForm from '../TaskCheckForm/TaskCheckForm';
import './Tasks.scss';

const Tasks = (): JSX.Element => {
  const { Panel } = Collapse;
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const dataService = new DataService();
    dataService
      .getAllTasks()
      .then((body) => {
        setTasks(body || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const genStateBadge = (state: TaskState): JSX.Element => {
    switch (state) {
      case 'DRAFT':
        return <Badge status="warning" text="Draft" />;
      case 'PUBLISHED':
        return <Badge status="success" text="Published" />;
      case 'ARCHIVED':
        return <Badge status="default" text="Archived" />;
      default:
        return <Badge status="warning" text="Draft" />;
    }
  };

  return (
    <div className="tasks">
      <h2>Tasks</h2>
      <Collapse
        accordion
        // bordered={false}
        // ghost
        expandIcon={({ isActive }): JSX.Element => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        {tasks.map((item) => {
          return (
            <Panel
              header={item.title}
              key={item.id}
              extra={genStateBadge(item.state)}
            >
              <SingleTask singleTask={item} />
              <TaskCheckForm singleTask={item} />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default Tasks;
