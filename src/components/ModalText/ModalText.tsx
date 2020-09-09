import React from 'react';
import { Input } from 'antd';


class ModalText extends React.Component {
    render() {
        return(
            <div>
                <Input placeholder="Title" />
                
                <Input placeholder="Author" />

                <Input placeholder="author" />
            </div>
        )
    }
}

export default ModalText;