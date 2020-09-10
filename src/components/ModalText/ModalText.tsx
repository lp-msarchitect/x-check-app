import React,{useState} from 'react';
import { Input } from 'antd';

const { TextArea } = Input;


function  ModalText() {
    const [title, setTitle] =useState('');

    const [titleItem1, setTitleItem1] =useState('');
    const [descriptionItem1, setDescriptionItem1] =useState('');
    const [minItem1, setMinItem1] =useState('');
    const [maxItem1, setMaxItem1] =useState('');

    const [titleItem2, setTitleItem2] =useState('');
    const [descriptionItem2, setDescriptionItem2] =useState('');
    const [minItem2, setMinItem2] =useState('');
    const [maxItem2, setMaxItem2] =useState('');

    const [titleItem3, setTitleItem3] =useState('');
    const [descriptionItem3, setDescriptionItem3] =useState('');
    const [minItem3, setMinItem3] =useState('');
    const [maxItem3, setMaxItem3] =useState('');




  
        return(
            <div>
                <Input 
                    placeholder="Title of Task" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} />

                <h3>Basic Scope</h3>

                <Input 
                    placeholder="Title of Basic Scope" 
                    value={titleItem1} 
                    onChange={(e:any) => setTitleItem1(e.target.value)} />
                <TextArea 
                    rows={4} 
                    placeholder='Description of Item' 
                    value={descriptionItem1} 
                    onChange={(e) => setDescriptionItem1(e.target.value)}/>
                <Input 
                    style={{ width: 100, textAlign: 'center' }}
                    placeholder="Minimum Score"
                    value={minItem1}
                    onChange={(e) => setMinItem1(e.target.value)}
                     />
                <Input
                    className="site-input-split"
                    style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: 'none',
                    }}
                    placeholder="~"
                    disabled
                />
                <Input
                    className="site-input-right"
                    style={{
                    width: 100,
                    textAlign: 'center',
                    }}
                    placeholder="Maximum"
                    value={maxItem1}
                    onChange={(e) => setMaxItem1(e.target.value)}

                />
                <h3>Extra Scope</h3>

                <Input 
                    placeholder="Title of Basic Scope" 
                    value={titleItem2} 
                    onChange={(e:any) => setTitleItem2(e.target.value)} />
                <TextArea 
                    rows={4} 
                    placeholder='Description of Item' 
                    value={descriptionItem2} 
                    onChange={(e) => setDescriptionItem2(e.target.value)}/>
                <Input 
                    style={{ width: 100, textAlign: 'center' }}
                    placeholder="Minimum Score"
                    value={minItem2}
                    onChange={(e) => setMinItem2(e.target.value)}
                     />
                <Input
                    className="site-input-split"
                    style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: 'none',
                    }}
                    placeholder="~"
                    disabled
                />
                <Input
                    className="site-input-right"
                    style={{
                    width: 100,
                    textAlign: 'center',
                    }}
                    placeholder="Maximum"
                    value={maxItem2}
                    onChange={(e) => setMaxItem2(e.target.value)}

                />
                <h3>Fines</h3>

                <Input 
                    placeholder="Title of Basic Scope" 
                    value={titleItem3} 
                    onChange={(e:any) => setTitleItem3(e.target.value)} />
                <TextArea 
                    rows={4} 
                    placeholder='Description of Item' 
                    value={descriptionItem3} 
                    onChange={(e) => setDescriptionItem3(e.target.value)}/>
                <Input 
                    style={{ width: 100, textAlign: 'center' }}
                    placeholder="Minimum Score"
                    value={minItem3}
                    onChange={(e) => setMinItem3(e.target.value)}
                     />
                <Input
                    className="site-input-split"
                    style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: 'none',
                    }}
                    placeholder="~"
                    disabled
                />
                <Input
                    className="site-input-right"
                    style={{
                    width: 100,
                    textAlign: 'center',
                    }}
                    placeholder="Maximum"
                    value={maxItem3}
                    onChange={(e) => setMaxItem3(e.target.value)}

                />
                
                
            </div>
        )
    
}

export default ModalText;