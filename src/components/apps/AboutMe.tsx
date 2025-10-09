import React from 'react';

const AboutMe: React.FC = () => {
    return (
        <div className="window-body">
            <div className="field-row">
                <img
                    src="/me.png"
                    alt="Profile"
                    style={{ width: '100px', height: '100px', marginRight: '15px' }}
                />
                <div>
                    <h4 style={{ marginBottom: '10px' }}>Nick Chatzoudas</h4>
                    <p>Computer Science Student</p>
                </div>
            </div>
            <hr />
            <div style={{ margin: '10px 0' }}>
                <h5>About Me</h5>
                <p>
                    bla bla bla
                </p>
            </div>
            <div style={{ margin: '10px 0' }}>
                <h5>Skills</h5>
                <ul className="tree-view">
                    <li>React / TypeScript</li>
                    <li>Node.js</li>
                    <li>CSS / HTML</li>
                    <li>Git</li>
                </ul>
            </div>
        </div>
    );
};

export default AboutMe;