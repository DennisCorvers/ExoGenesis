import React from 'react';

const ErrorPage: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: '20px',
                textAlign: 'center',
            }}
        >
            <h1>Oops, something went wrong!</h1>
            <p>
                The page you're looking for either doesn't exist or encountered an error while loading.
            </p>
        </div>
    );
};

export default ErrorPage;
