import React, {useRef} from 'react';
import { useSound } from '@/contexts/SoundContext';

type MenuButtonProps = {
    text: string,
    onClick: () => void,
    icon?: React.ReactNode
};

const MenuButton:React.FC<MenuButtonProps> = ({ text, onClick, icon }) => {
    const { playClickSound } = useSound();
    const onClickHandler = () => {
        playClickSound();
        onClick();
    }

    return <button style={{fontSize: '2.5rem', fontWeight: 'bold', width: 'var(--buttonWidth)', borderWidth: '0.5vh', height: 'var(--buttonHeight)'}} className=' my-6 rounded-xl ' onClick={onClickHandler}>{icon}{text}</button>
}

export default MenuButton;