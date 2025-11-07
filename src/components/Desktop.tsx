import React, { useState } from 'react';
import Taskbar from './Taskbar';
import Window from './Window';
import AboutMe from './apps/AboutMe';
import DosBox from './apps/DosBox';


interface AppConfig {
    id: string;
    title: string;
    icon: string;
    component: 'AboutMe' | 'DosBox';
    bundleUrl?: string;
}

interface WindowState {
    id: string;
    appId: string;
    title: string;
    isActive: boolean;
    x: number;
    y: number;
}

const apps: AppConfig[] = [
    {
        id: 'about-me',
        title: 'About Me',
        icon: '/icon.png',
        component: 'AboutMe'
    },
    {
        id: 'pacman',
        title: 'Pac Man',
        icon: '/icons/Pacman.png',
        component: 'DosBox',
        bundleUrl: '/roms/pacman.jsdos'
    },
    {
        id: 'dos-game-2',
        title: 'DOS Game 2',
        icon: '/icons/Pacman.png',
        component: 'DosBox',
        bundleUrl: '/roms/digger.jsdos'
    }
    // Add more apps here
];

const Desktop: React.FC = () => {
    const [windows, setWindows] = useState<WindowState[]>([]);

    const handleWindowFocus = (id: string) => {
        setWindows(windows.map(w => ({ ...w, isActive: w.id === id })));
    };

    const handleWindowClose = (id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    };

    const handleIconDoubleClick = (appId: string) => {
        const app = apps.find(a => a.id === appId);
        if (!app) return;

        const newWindow: WindowState = {
            id: `${appId}-${Date.now()}`,
            appId: app.id,
            title: app.title,
            isActive: true,
            x: Math.random() * (window.innerWidth - 600),
            y: Math.random() * (window.innerHeight - 500)
        };

        setWindows([...windows.map(w => ({ ...w, isActive: false })), newWindow]);
    };

    const renderWindowContent = (window: WindowState) => {
        const app = apps.find(a => a.id === window.appId);
        if (!app) return <div>Window content not found</div>;

        switch (app.component) {
            case 'AboutMe':
                return <AboutMe />;
            case 'DosBox':
                console.log("Rendering DosBox for", app.bundleUrl);
                if (!app.bundleUrl) {
                    return <div>Missing bundleUrl for {app.title}</div>;
                }
                return (
                    <DosBox bundleUrl={app.bundleUrl} />
                );

            default:
                return <div>Window content not found</div>;
        }
    };

    return (
        <div className="desktop">
            <div className="desktop-image" />
            <div className="desktop-content">
                {apps.map(app => (
                    <div
                        key={app.id}
                        className="desktop-icon"
                        onDoubleClick={() => handleIconDoubleClick(app.id)}
                    >
                        <img src={app.icon} alt={app.title} />
                        <span className="desktop-icon-text">{app.title}</span>
                    </div>
                ))}

                {windows.map(window => (
                    <Window
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        isActive={window.isActive}
                        x={window.x}
                        y={window.y}
                        onFocus={() => handleWindowFocus(window.id)}
                        onClose={() => handleWindowClose(window.id)}
                    >
                        {renderWindowContent(window)}
                    </Window>
                ))}
            </div>
            <Taskbar activeWindows={windows} onWindowClick={handleWindowFocus} />
        </div>
    );
};

export default Desktop;
