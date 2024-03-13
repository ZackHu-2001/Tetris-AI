'use client'
import React from 'react';
import Timer from '@/components/Timer/Timer';

type StatusPanelProps = {
    
};

const StatusPanel:React.FC<StatusPanelProps> = () => {
    
    return (
        <div className='w-1/6 flex flex-col items-center '>
            <div>Status</div>
            <Timer />
        </div>
    )
    
}
export default StatusPanel;