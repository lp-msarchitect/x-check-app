import React, { MouseEvent, useState } from 'react';
import { Affix, Button, Form } from 'antd';
import { Task, TaskItem } from '../../models/data-models';
import CheckTask from './CheckTask/CheckTask';
import './TaskCheckForm.scss';

interface SingleTaskProps {
  singleTask: Task;
}

const TaskCheckForm = ({ singleTask }: SingleTaskProps): JSX.Element => {
  const [taskScores, setTaskScores] = useState<number[]>(
    new Array(singleTask.items.length).fill(0)
  );
  const [totalScore, setTotalScore] = useState<number>(0);
  const [checkedTaskItems, setCheckedTaskItems] = useState<number>(0);
  const [form] = Form.useForm();
  const [displayForm, setDisplayForm] = useState<boolean>(true);
  const [selected, setSelected] = useState<boolean>(false);

  const scoreCategory = [
    'Not completed',
    'Partially completed',
    'Fully completed',
    'Clear',
  ];

  const showForm = (): void => {
    setDisplayForm(!displayForm);
  };

  const submitHandler = (values: string): void => {
    console.log(values, totalScore);
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
      const { category } = elem;
      if (category === 'Fines') {
        obj[category] = 'No';
      } else {
        obj[category] = value;
      }

      switch (value) {
        case scoreCategory[0]:
          setTotalScore(0);
          setCheckedTaskItems(singleTask.items.length);
          setSelected(true);
          form.setFieldsValue(obj);
          break;
        case scoreCategory[1]: {
          const scores = singleTask.items.map((item: TaskItem) => {
            return item.maxScore / 2;
          });
          setTaskScores(scores);
          setTotalScore(
            scores.reduce((a, b) => {
              return a + b;
            }, 0)
          );
          setCheckedTaskItems(singleTask.items.length);
          setSelected(true);
          form.setFieldsValue(obj);
          break;
        }
        case scoreCategory[2]: {
          const scores = singleTask.items.map((item: TaskItem) => {
            return item.maxScore;
          });
          setTaskScores(scores);
          setTotalScore(
            scores.reduce((a, b) => {
              return a + b;
            }, 0)
          );
          setCheckedTaskItems(singleTask.items.length);
          setSelected(true);
          form.setFieldsValue(obj);
          break;
        }
        case scoreCategory[3]:
          setCheckedTaskItems(0);
          setTotalScore(0);
          setTaskScores(new Array(singleTask.items.length).fill(0));
          setSelected(false);
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
              {scoreCategory.map((elem) => {
                return (
                  <Button
                    className="button"
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
              selected={selected}
              setSelected={setSelected}
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
/*
<div className="fast-score-buttons">
<Button
  className="button"
  htmlType="button"
  type="default"
  onClick={(event): void => fillForm(event)}
>
  0
</Button>
<Button className="button" htmlType="button" type="default">
  50%
</Button>
<Button className="button" htmlType="button" type="default">
  100%
</Button>
<Button className="button" htmlType="button" type="default">
  Clear
</Button>
</div>
*/
export default TaskCheckForm;
