import React from 'react';
import { Modal, Button } from 'antd';
import ModalText from '../ModalText/ModalText';
import DataService  from '../../services/data-service'

class ButtonForCreateTask extends React.Component {
    state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    };
  
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = () => {
      this.setState({
        ModalText: 'The modal will be closed after two seconds',
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000);
    };
  
    handleCancel = () => {
      console.log('Clicked cancel button');
      this.setState({
        visible: false,
      });
      const dataService = new DataService();
      dataService.sendTask('/tasks',{})
    };
  
    render() {
      const { visible, confirmLoading,} = this.state;
      return (
        <>
          <Button type="primary" onClick={this.showModal}>
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

export default ButtonForCreateTask;