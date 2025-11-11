import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../firebase.config";



const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const gprovider = new GoogleAuthProvider()

    // // Show or Hide Password
    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => setShowPassword(!showPassword)

    const location = useLocation();
    const from = location.state?.from || "/";

    const handleLogin = (e) => {
        e.preventDefault()
        setError("")

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Logged in user", user);
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setError(err.message);
            });

        form.reset()
    };
    const handleGoogleLogin = () => {
        signInWithPopup(auth, gprovider)
            .then((result) => {
                const user = result.user;
                console.log("Login success", user);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error("Login error", error);
                setError(error.message);
            });
    };


    return (
        <div className="hero bg-base-200 p-10 min-h-screen">
            <div className="card bg-base-100 w-full max-w-lg mx-auto shrink-0">
                <div className="card-body px-12 py-10">
                    <form onSubmit={handleLogin}>
                        <fieldset className="fieldset space-y-4">
                            <h1 className="text-5xl font-bold text-center mb-6">Login now!</h1>

                            <div className="flex flex-col space-y-2">
                                <label className="label font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered w-full"
                                    placeholder="Email"
                                    required/>
                            </div>

                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="input input-bordered w-full pr-10"
                                    placeholder="Password"
                                    required/>
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="absolute right-5 text-lg text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {error && <p className="text-red-500 mt-2">{error}</p>}

                            <button type="submit" className="btn bg-[#8BBA45] text-white mt-4 w-full">
                                Login
                            </button>
                        </fieldset>
                    </form>

                    <div>
                        <p className="pt-3 text-center">
                            Don't Have An Account? Please{" "}
                            <Link className="font-semibold text-[#8BBA45]" to="/signup">
                                Sign Up
                            </Link>
                        </p>
                    </div>

                    <div className="text-center">
                        {/* Google */}
                        <button onClick={handleGoogleLogin} className="btn w-full bg-white text-black border-gray-300 mt-2">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
