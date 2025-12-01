import React, { useState, useRef, useEffect } from 'react';

interface WindowProps {
    id: string;
    title: string;
    icon?: string;
    isActive: boolean;
    x: number;
    y: number;
    onFocus: () => void;
    onClose: () => void;
    type?: string; // Add this prop
    children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
    title,
    icon,
    isActive,
    x: initialX,
    y: initialY,
    onFocus,
    onClose,
    type,
    children
}) => {
    const window_width = 600;
    const window_height = 500;
    const [isDragging, setIsDragging] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [size, setSize] = useState({ width: window_width, height: window_height });
    const [prevSize, setPrevSize] = useState({ width: window_width, height: window_height, x: initialX, y: initialY });

    const windowRef = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef({ x: 0, y: 0 });

    const handleDragStart = (e: React.MouseEvent) => {
        if (!isMaximized) {
            setIsDragging(true);
            dragStartRef.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y
            };
        }
    };

    const handleDrag = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStartRef.current.x,
                y: e.clientY - dragStartRef.current.y
            });
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleMaximize = () => {
        if (!isMaximized) {
            setPrevSize({
                width: size.width,
                height: size.height,
                x: position.x,
                y: position.y
            });
            setPosition({ x: 0, y: 0 });
            // Adjust height to account for taskbar (28px)
            setSize({
                width: window.innerWidth,
                height: window.innerHeight - 40 // increased from 28 to 40 for padding
            });
        } else {
            setPosition({ x: prevSize.x, y: prevSize.y });
            setSize({ width: prevSize.width, height: prevSize.height });
        }
        setIsMaximized(!isMaximized);
    };

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        onClose();
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDrag);
            window.addEventListener('mouseup', handleDragEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', handleDragEnd);
        };
    }, [isDragging]);

    if (isMinimized) return null;

    return (
        <div
            ref={windowRef}
            className={`window ${isActive ? 'active' : ''}`}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                zIndex: isActive ? 10 : 1,
                display: 'flex',
                flexDirection: 'column'
            }}
            onClick={onFocus}
        >
            <div className="title-bar" onMouseDown={handleDragStart}>
                <div className="title-bar-text">
                    {icon && <img src={icon} alt="" style={{ width: '16px', height: '16px', marginRight: '6px', verticalAlign: 'middle' }} />}
                    {title}
                </div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" onClick={handleMinimize}></button>
                    <button aria-label="Maximize" onClick={handleMaximize}></button>
                    <button aria-label="Close" onClick={handleClose}></button>
                </div>
            </div>
            <div className={`window-body ${type === 'DosBox' ? 'dosbox' : ''}`}>
                {children}
            </div>
            {!isMaximized && (
                <>

                </>
            )}
        </div>
    );
};

export default Window;