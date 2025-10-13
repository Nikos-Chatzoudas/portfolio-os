import React from 'react';

const AboutMe: React.FC = () => {
    return (
        <div className="window-body">
            <div className="field-row">
                <img
                    src="/me.png"
                    alt="Profile"
                    style={{ width: '100px', height: '100px', margin: '15px', borderRadius: '2px' }}
                />
                <div>
                    <h4 style={{ marginBottom: '10px' }}>Nick Chatzoudas</h4>
                    <p>Computer Science Student</p>
                </div>
            </div>
            <hr />
            <div style={{ margin: '10px 0' }}>
                <div className='section'>
                    <h4>About Me</h4>
                    <p>
                        I am a passionate student at the University of Thessaly in the
                        department of Digital Systems in Greece, driven by a deep love for
                        computer science. My knowledge encompasses a wide range of
                        programming languages. Through engaging in numerous hands-on
                        projects, I have honed my skills in various domains such as web
                        development, software solutions, and problem-solving.
                    </p>
                </div>
                <div className='section'>
                    <h4>Projects</h4>

                    <h5>iGem Competition (2024)</h5>
                    <p>I participated in the iGEM (International Genetically Engineered Machine) competition with the iGEM Thessaly
                        team, collaborating with a diverse group to tackle real-world challenges using synthetic biology. This
                        experience demonstrated my strong teamwork, problem-solving, and project management skills.
                    </p>
                    <p>As the team's web developer, I created two websites:</p>
                    <ul>
                        <li>
                            The main <a target="_blank" className="link" href="https://igem-thessaly.uth.gr/index.html">iGEM Thessaly
                                Website</a>, which
                            serves as an archive of all past Thessaly teams and their contributions.
                        </li>
                        <li>
                            The <a target="_blank" className="link" href="https://2024.igem.wiki/thessaly/">Thaelia website(wiki)</a>, which
                            was used for
                            the
                            competition to present our experiment ideas and
                            achievements.
                        </li>
                    </ul>
                    <p>These experiences not only honed my technical abilities but also fostered effective communication and
                        presentation skills, vital for conveying complex scientific concepts to diverse audiences."</p>
                </div>
            </div>

        </div>
    );
};

export default AboutMe;