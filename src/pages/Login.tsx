import React from "react"

const Login = () => {
    return (
        <>
            <h1>Oasis Community Portal</h1>
            <div>
                <h2>Login</h2>
                <form>
                    <input placeholder="Username" type="email"/>
                    <input placeholder="Password" type="password"/>
                    <button>Login</button>
                </form>

            </div>

        </>
    )
}

export default Login;