import React,{useState} from 'react';
import { Input } from 'antd';


function  ModalText() {
    const [title, setTitle] =useState('');
    const [title, setTitle] =useState('');
    const [title, setTitle] =useState('');
    const [title, setTitle] =useState('');
    const [title, setTitle] =useState('');
    const [title, setTitle] =useState('');
    const [title, setTitle] =useState('');

  
        return(
            <div>
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                
                
                
            </div>
        )
    
}

export default ModalText;