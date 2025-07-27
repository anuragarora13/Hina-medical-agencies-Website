import React from 'react';

const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #1565c0, #2196f3)',
    color: '#fff',
    fontSize: '1.5rem',
    flexDirection: 'column',
};

function PageLoader() {
    return (
        <div style={loaderStyle}>
            <div className="spinner" />
            <p>Loading Hina Medical...</p>
        </div>
    );
}

export default PageLoader;
