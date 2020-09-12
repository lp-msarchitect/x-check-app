import React from 'react';
import { Modal, Button } from 'antd';
import ModalText from '../ModalText/ModalText';
import DataService from '../../services/data-service';
import './ModalWrap.scss';

interface ModalState {
  visible: boolean;
  confirmLoading: boolean;
}

class ModalWrap extends React.Component<{}, ModalState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
    };
  }

  showModal = (): void => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (): void => {
    const dataService = new DataService();
    dataService.sendTask('/tasks', {});
    this.setState({
      confirmLoading: true,
    });

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = (): void => {
    this.setState({
      visible: false,
    });
  };

  render(): JSX.Element {
    const { visible, confirmLoading } = this.state;
    return (
      <>
        <Button
          type="primary"
          onClick={this.showModal}
          className="create-task-btn"
        >
          Add Task
        </Button>
        <Modal
          title="Add task"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <ModalText />
        </Modal>
      </>
    );
  }
}

export default ModalWrap;
