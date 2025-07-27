import React from 'react';

const Companies = () => {
    const companies = ['Cipla', 'Sun Pharma', 'Dr. Reddy\'s', 'Mankind', 'Alkem'];

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Partnered Companies</h1>
            <ul>
                {companies.map((company, index) => (
                    <li key={index}>{company}</li>
                ))}
            </ul>
        </div>
    );
};

export default Companies;
