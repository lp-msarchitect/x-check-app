import React, { MouseEvent, useState } from 'react';
import { Affix, Button, Form } from 'antd';
import { Task, TaskItem } from '../../models/data-models';
import CheckTask from './CheckTask/CheckTask';
import './TaskCheckForm.scss';

const fastScoreButtons = [
  'Not completed',
  'Partially completed',
  'Fully completed',
  'Clear',
];

interface SingleTaskProps {
  singleTask: Task;
  onSubmitForm: Function;
}

const TaskCheckForm = ({
  singleTask,
  onSubmitForm,
}: SingleTaskProps): JSX.Element => {
  const [taskScores, setTaskScores] = useState<number[]>(
    new Array(singleTask.items.length).fill(0)
  );
  const [totalScore, setTotalScore] = useState<number>(0);
  const [checkedTaskItems, setCheckedTaskItems] = useState<number>(0);
  const [form] = Form.useForm();
  const [displayForm, setDisplayForm] = useState<boolean>(true);
  const [checkedTasks, setCheckedTasks] = useState<boolean[]>(
    new Array(singleTask.items.length).fill(false)
  );

  const showForm = (): void => {
    setDisplayForm(!displayForm);
  };

  const submitHandler = (): void => {
    onSubmitForm(totalScore);
    showForm();
  };

  const closeForm = (): void => {
    setTaskScores(new Array(singleTask.items.length).fill(0));
    setTotalScore(0);
    setCheckedTaskItems(0);
    form.resetFields();
    showForm();
  };

  const fastFillForm = (event: MouseEvent<HTMLElement>): void => {
    const obj: any = {};
    const value = event.currentTarget.textContent;
    singleTask.items.forEach((elem: TaskItem): void => {
      const { title, category } = elem;
      if (category === 'Fines') {
        obj[title] = 'No';
      } else {
        obj[title] = value;
      }

      switch (value) {
        case fastScoreButtons[0]:
          setTotalScore(0);
          setCheckedTaskItems(singleTask.items.length);
          setCheckedTasks(
            checkedTasks.map(() => {
              return true;
            })
          );
          form.setFieldsValue(obj);
          break;
        case fastScoreButtons[1]: {
          const scores = singleTask.items.map((item: TaskItem) => {
            return item.maxScore / 2;
          });
          setTaskScores(scores);
          setTotalScore(
            scores.reduce((a, b) => {
              return a + b;
            }, 0)
          );
          setCheckedTasks(
            checkedTasks.map(() => {
              return true;
            })
          );
          setCheckedTaskItems(singleTask.items.length);
          form.setFieldsValue(obj);
          break;
        }
        case fastScoreButtons[2]: {
          const scores = singleTask.items.map((item: TaskItem) => {
            return item.maxScore;
          });
          setTaskScores(scores);
          setTotalScore(
            scores.reduce((a, b) => {
              return a + b;
            }, 0)
          );
          setCheckedTasks(
            checkedTasks.map(() => {
              return true;
            })
          );
          setCheckedTaskItems(singleTask.items.length);
          form.setFieldsValue(obj);
          break;
        }
        case fastScoreButtons[3]:
          setCheckedTasks(
            checkedTasks.map(() => {
              return false;
            })
          );
          setCheckedTaskItems(0);
          setTotalScore(0);
          setTaskScores(new Array(singleTask.items.length).fill(0));
          form.resetFields();
          break;
        default:
          break;
      }
    });
  };

  return (
    <div className={displayForm ? 'form-container' : 'form-container disabled'}>
      <Form className="task-check-form" onFinish={submitHandler} form={form}>
        <Affix offsetTop={0}>
          <button
            className="close-form"
            onClick={(): void => closeForm()}
            type="button"
            aria-label="Close form button"
          />
          <div className="form-header">
            <h2 className="title">{singleTask.id}</h2>
            <div className="fast-score-buttons">
              {fastScoreButtons.map((elem) => {
                return (
                  <Button
                    className={`button ${elem}`}
                    htmlType="button"
                    type="default"
                    key={elem}
                    onClick={(event): void => fastFillForm(event)}
                  >
                    {elem}
                  </Button>
                );
              })}
            </div>
            <div className="score-container">
              <p className="progress">
                Checked {checkedTaskItems} out of {singleTask.items.length}
              </p>
              <p className="score-board">Total points: {totalScore}</p>
            </div>
          </div>
        </Affix>
        <p className="criteria">Task criteria or description</p>
        {singleTask.items.map((elem, id) => {
          return (
            <CheckTask
              taskItem={elem}
              key={elem.id}
              taskScores={taskScores}
              setTaskScores={setTaskScores}
              setTotalScore={setTotalScore}
              checkedTaskItems={checkedTaskItems}
              setCheckedTaskItems={setCheckedTaskItems}
              checkedTasks={checkedTasks}
              setCheckedTasks={setCheckedTasks}
              itemId={id}
            />
          );
        })}
        <hr />
        <Button
          type="primary"
          htmlType="submit"
          className="submit-button"
          size="large"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default TaskCheckForm;
