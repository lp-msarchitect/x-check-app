import React,{useState} from 'react'
import {Modal,Button,Input,Form,DatePicker,InputNumber,Select} from 'antd'

const CreateSession= ():JSX.Element =>{

    const [visible, setVisible] = useState(false)

    const showModal = () => {
        setVisible(true)
     };

    const handleOk = () => {
      setVisible(false)
    };   

    const handleCancel = () => {
        setVisible(false)
    };
     
    return (
    
        <div>
            <Button onClick={showModal} type="primary">Add session</Button>
            <Modal
            title="Create Session"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            >
                <Form.Item label="Name of session">
                    <Input />
                </Form.Item>

                <Form.Item label="Name of task">
                    <Input />
                </Form.Item>

                <Form.Item label="Start date">
                <   DatePicker />
                </Form.Item>

                <Form.Item label="End date ">
                    <DatePicker />
                </Form.Item>

                <Form.Item label="Coefficient">
                    <InputNumber />
                </Form.Item>

                <Form.Item label="Discard min score">
                    <Select>
                        <Select.Option value="">true</Select.Option>
                        <Select.Option value="">false</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Discard max score">
                    <Select>
                        <Select.Option value="">true</Select.Option>
                        <Select.Option value="">false</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Min reviews amount">
                    <InputNumber />
                </Form.Item>

                <Form.Item label="Desire reviewers Amount">
                    <InputNumber />
                </Form.Item>

          </Modal>
        </div>
          
    )
}

export default CreateSession;