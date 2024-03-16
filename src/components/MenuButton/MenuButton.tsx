import React from 'react';

type MenuButtonProps = {
    text: string,
    onClick: () => void,
};

const MenuButton:React.FC<MenuButtonProps> = ({ text, onClick }) => {
    
    return <button className='px-4 py-1 rounded-lg border-2' onClick={onClick}>{text}</button>
}
export default MenuButton;