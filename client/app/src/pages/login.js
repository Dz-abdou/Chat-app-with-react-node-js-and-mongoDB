import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin()

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await login(email, password);
            if(!error)
                history.replace('/home');
        } catch (error) {
            console.log(error.message);
        }
    };

    const redirectToSignup = () => {
        history.replace('/signup');
    }

    return (
        <div className="form" onSubmit={handleSubmit}>
            <h1 className="title">Login</h1>
            <form>
                <div className="input-container">
                    <label>Email </label>
                    <input
                        type="email"
                        name="email"
                        className="signup"
                        required
                        onChange={(e) => { setEmail(e.target.value); }}
                        value={email} />
                </div>
                <div className="input-container">
                    <label>Mot de passe </label>
                    <input
                        type="password"
                        name="pass"
                        className="signup"
                        required
                        onChange={(e) => { setPassword(e.target.value); }}
                        value={password} />
                </div>
                <div className="button-container">
                    <input type="submit" disabled={isLoading} />
                </div>
                <center><h1 className="login-signup" onClick={redirectToSignup}>Signup</h1></center>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default LoginPage;