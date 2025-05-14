import { useContext, useState } from "react";
import "./LoginPage.css";
import Error from "../ui/Error";
import api from "../../api";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const { setIsAuthenticated, get_username } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const userInfo = { username, password };

        api.post("token/", userInfo)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("access", res.data.access);
                localStorage.setItem("refresh", res.data.refresh);
                setUsername("");
                setPassword("");
                setIsAuthenticated(true);
                get_username();

                const from = location?.state?.from?.pathname || "/";
                navigate(from, { replace: true });
            })
            .catch((err) => {
                console.error(err.response?.data || err.message);
                setError(err.response?.data?.detail || "Login failed. Please check your credentials.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="login-container my-5">
            <div className="login-card shadow">
                {error && <Error error={error} />}
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Please login to your account</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            id="username"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="login-footer text-center mt-3">
                    <p><a href="#">Forgot Password?</a></p>
                    <p>
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
