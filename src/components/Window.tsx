import React, { useState, useRef, useEffect } from 'react';

interface WindowProps {
    id: string;
    title: string;
    isActive: boolean;
    x: number;
    y: number;
    onFocus: () => void;
    onClose: () => void;
    children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
    id,
    title,
    isActive,
    x: initialX,
    y: initialY,
    onFocus,
    onClose,
    children
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [size, setSize] = useState({ width: 400, height: 300 });
    const [prevSize, setPrevSize] = useState({ width: 400, height: 300, x: initialX, y: initialY });

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
                <div className="title-bar-text">{title}</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" onClick={handleMinimize}></button>
                    <button aria-label="Maximize" onClick={handleMaximize}></button>
                    <button aria-label="Close" onClick={handleClose}></button>
                </div>
            </div>
            <div className="window-body" style={{
                flex: 1,
                overflow: 'auto',
                height: 'calc(100% - 32px)'
            }}>
                <div className='window-content' >
                    {children}
                </div>
            </div>
            {!isMaximized && (
                <>

                </>
            )}
        </div>
    );
};

export default Window;