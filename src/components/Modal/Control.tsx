import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { useGameBoard } from '../GameBoard';

type ControlProps = {

};

const Control: React.FC<ControlProps> = () => {
    const { setModal } = useGameBoard();
    const handleDone = () => {
        setModal('mainMenu')
    }
    return <div  className='flex flex-col justify-center items-center h-full'>
        <div className='title'>Control</div>
        <div style={{fontSize: '2.5rem', paddingLeft: '4rem', paddingRight: '4rem', textAlign: 'center'}}>Click on the control you want to change, then press any key.</div>
        <div className='flex flex-col justify-between '>
            <div>
                <div>Move Left</div>
                <button></button>
            </div>

        </div>
        <MenuButton text='Done' onClick={handleDone}></MenuButton>
    </div>
}
export default Control;