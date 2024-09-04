import React, { useState } from 'react';
import './Auth.css';

const SignIn = ({ onSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add authentication logic here
        console.log('Sign In:', email, password);
        onSignIn();  // Call the sign-in handler
    };

    return (
        <div className="auth-container">
        <h2>MOMSync</h2>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
