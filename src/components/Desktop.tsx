import React, { useState } from 'react';
import Taskbar from './Taskbar';
import Window from './Window';
import AboutMe from './apps/AboutMe';

interface WindowState {
    id: string;
    title: string;
    isActive: boolean;
    x: number;
    y: number;
    component: string;
}

const Desktop: React.FC = () => {
    const [windows, setWindows] = useState<WindowState[]>([
        {
            id: 'about-me',
            title: 'About Me',
            isActive: true,
            x: 100,
            y: 100,
            component: 'AboutMe'
        }
    ]);

    const handleWindowFocus = (id: string) => {
        setWindows(windows.map(window => ({
            ...window,
            isActive: window.id === id
        })));
    };

    const handleWindowClose = (id: string) => {
        setWindows(prevWindows => prevWindows.filter(window => window.id !== id));
    };

    const handleIconDoubleClick = (appId: string) => {
        const newWindow = {
            id: `${appId}-${Date.now()}`,
            title: appId === 'about-me' ? 'About Me' : 'Unknown App',
            isActive: true,
            x: Math.random() * (window.innerWidth - 600),
            y: Math.random() * (window.innerHeight - 500),
            component: appId === 'about-me' ? 'AboutMe' : appId
        };

        setWindows([...windows.map(w => ({ ...w, isActive: false })), newWindow]);
    };

    const renderWindowContent = (window: WindowState) => {
        switch (window.component) {
            case 'AboutMe':
                return <AboutMe />;
            default:
                return <div>Window content not found</div>;
        }
    };

    return (
        <div className="desktop">
            <div className="background-image" />
            <div className="desktop-content">
                <div className="desktop-icon" onDoubleClick={() => handleIconDoubleClick('about-me')}>
                    <img src="/logo.png" alt="About Me" />
                    <span className="desktop-icon-text">About Me</span>
                </div>
                {windows.map((window) => (
                    <Window
                        key={window.id}
                        {...window}
                        onFocus={() => handleWindowFocus(window.id)}
                        onClose={() => handleWindowClose(window.id)}
                    >
                        {renderWindowContent(window)}
                    </Window>
                ))}
            </div>
            <Taskbar
                activeWindows={windows}
                onWindowClick={handleWindowFocus}
            />
        </div>
    );
};

export default Desktop;