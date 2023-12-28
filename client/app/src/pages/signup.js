import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSignup } from '../hooks/useSignup';

const SignupPage = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const { signup, error, isLoading } = useSignup()

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        await signup(username, email, password);
        history.replace('/home');
        // if (email !== '' && username !== '' && password !== '' && confirmedPassword !== '') {
        //     if (password === confirmedPassword) {
        //         const user = { username, email, password };

        //         fetch('http://localhost:8000/signup', {
        //             method: 'POST',
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(user)
        //         })
        //             .then(response => {
        //                 if (response.ok) {
        //                     history.replace("/test");
        //                 }
        //                 response.json().then(json => {
        //                     alert(json.message);
        //                 });
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             });
        //     }
        // }
    };
    const redirectToLogin = () => {
        history.replace('/login');
    }

    return (
        <div className="form" onSubmit={handleSubmit}>
            <h1 className="title">Signup</h1>
            <form>
                <div className="input-container">
                    <label>Username </label>
                    <input
                        type="text"
                        name="uname"
                        className="signup"
                        required
                        onChange={(e) => { setUsername(e.target.value); }}
                        value={username} />
                </div>
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
                <div className="input-container">
                    <label>Confirmer Mot de passe </label>
                    <input
                        type="password"
                        name="pass"
                        className="signup"
                        required
                        onChange={(e) => { setConfirmedPassword(e.target.value); }}
                        value={confirmedPassword} />
                </div>
                <div className="button-container">
                    <input type="submit" disabled={isLoading} />
                </div>
                <center><h1 className="login-signup" onClick={redirectToLogin}>Login</h1></center>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default SignupPage;