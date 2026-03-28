import { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem("currentUserEmail") ? { email: localStorage.getItem("currentUserEmail") } : null)

    function signUp(email, password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find(u => u.email === email)) {
            alert("User already exists")
            return { success: false, message: "User already exists" }
        }
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email);
        setUser({ email })

        return { success: true, message: "User created successfully" }
    }
    function signIn(email, password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === email);
        if (!user) {
            return { success: false, message: "User not found" }
        }
        if (user.password !== password) {
            return { success: false, message: "Invalid email or password" }
        }
        localStorage.setItem("currentUserEmail", email);
        setUser({ email })

        return { success: true, message: "User logged in successfully" }
    }
    function logout() {
        localStorage.removeItem("currentUserEmail")
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ signUp, user, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)