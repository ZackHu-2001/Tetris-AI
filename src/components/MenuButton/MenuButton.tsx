import React from 'react';

type MenuButtonProps = {
    text: string,
    onClick: () => void,
    icon?: React.ReactNode
};

const MenuButton:React.FC<MenuButtonProps> = ({ text, onClick, icon }) => {
    
    return <button className='w-36 px-4 my-2 py-1 rounded-lg border-2' onClick={onClick}>{icon}{text}</button>
}
export default MenuButton;