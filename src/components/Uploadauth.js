import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Uploadauth = () => {

    const [password, setPassword] = useState("SMSHS2024");
    const [enteredPassword, setEnteredPassword] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        setEnteredPassword(event.target.value);
    };

    const checkPassword = () => {
        if (enteredPassword === password) {
            alert("Access granted!");
            navigate("/62331478615670891832");
        } else {
            alert("Incorrect password. Access denied!");
            navigate("/")
        }
    };


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Enter the password </h2>
                    <input
                        type="password"
                        value={enteredPassword}
                        onChange={handlePasswordChange}
                        className="rounded-md w-full border border-gray-400 p-3 mb-5"
                    />
                    <button
                        onClick={checkPassword}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5 text-lg"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

