import React from 'react';
import MenuButton from '../MenuButton/MenuButton';

type SettingProps = {
    
};

const Setting:React.FC<SettingProps> = () => {
    const handleDone = () => {
        console.log('done')
    }
    return <div>
        <MenuButton text='Done' onClick={handleDone}></MenuButton>
    </div>
}
export default Setting;