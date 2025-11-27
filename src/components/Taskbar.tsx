import React, { useState, useEffect } from 'react';
import '98.css/dist/98.css';

interface TaskbarProps {
    activeWindows: {
        id: string;
        title: string;
        isActive: boolean;
    }[];
    onWindowClick: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ activeWindows, onWindowClick }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="taskbar">

            <div className='start-button-container'>
                <button className="start-button">
                    <img
                        src="/icons/windowsStartIcon.png"
                        alt="Start"
                        className="windows-logo"
                        style={{ width: '16px', height: '16px', marginRight: '4px' }}
                    />
                    Start
                </button>
            </div>

            <div className="taskbar-items">
                {activeWindows.map((window) => (
                    <button
                        key={window.id}
                        className={`window-button ${window.isActive ? 'active' : ''}`}
                        onClick={() => onWindowClick(window.id)}
                    >
                        {window.title}
                    </button>
                ))}
            </div>
            <div className="system-tray">
                <div className="time">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
};

export default Taskbar;