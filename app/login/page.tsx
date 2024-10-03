"use client"
import React from "react";
import { signIn } from "next-auth/react";

export default function Login() {

    return (
        <div>
            <div>
                <p>Login</p>
                <button onClick={() => signIn("google")}>
                    Google
                </button>
                <button onClick={() => signIn("github")}>
                    Github
                </button>
            </div>
        </div>
    )
}