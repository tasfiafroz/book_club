// import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";

// export const useLogin = () => {
//     const [error, setError] = useState(null)
//     const [isLoading, setIsLoading] = useState(null)
//     const { dispatch } = useAuthContext()

//     const login = async (email, password) => {
//         setIsLoading(true)
//         setError(null)

//         const response = await fetch('/api/user/login', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({email, password})
//         })
//         const json = await response.json()

//         if (!response.ok) {
//             setIsLoading(false)
//             setError(json.error)
//         }
//         if (response.ok) {
//             // save the user to local storage
//             localStorage.setItem('user', JSON.stringify(json))

//             // update the auth context
//             dispatch({type: 'LOGIN', payload: json})

//             setIsLoading(false)
//         }
//     }

//     return { login, isLoading, error }
// }


import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || "Login failed");
                return null; // Return null if login fails
            }

            if (json.token) {  // ✅ Ensure token exists
                localStorage.setItem("token", json.token); // ✅ Store only the token
                localStorage.setItem("email", email);
                dispatch({ type: "LOGIN", payload: json });

                setIsLoading(false);
                return json.token; // ✅ Return the token
            } else {
                setError("Login failed: Token not received.");
                setIsLoading(false);
                return null;
            }
        } catch (err) {
            setIsLoading(false);
            setError("Network error. Please try again.");
            return null;
        }
    };

    return { login, isLoading, error };
};
