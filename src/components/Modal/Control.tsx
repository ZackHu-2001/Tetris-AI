import React from 'react';
import MenuButton from '../MenuButton/MenuButton';

type ControlProps = {
    
};

const Control:React.FC<ControlProps> = () => {
    const handleDone = () => {
        console.log('done')
    }
    return <div>
        <MenuButton text='Done' onClick={handleDone}></MenuButton>
    </div>
}
export default Control;