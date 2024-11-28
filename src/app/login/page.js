"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";

export default function Login() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn("credentials", { email, password, redirect: false }).then( async(e)=>{
        if(e.error){
            setError("Invalid email/password")
        } else{
            router.push("/");
        }
    })
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.wrapper}>
        <p className={error === "" ? styles.hide : styles.show}>{error}</p>
        <form className={styles.loginForm} onSubmit={handleSignIn}>
          <div>
            <label className={styles.Label}>Email</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.Input}
              placeholder="John@example.com"
            />
          </div>
          <div>
            <label className={styles.Label}>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.Input}
              placeholder="******"
            />
          </div>
          <button type="submit" className={`${styles.btn} ${styles.loginBtn}`}>
            Log in
          </button>
          <p className={styles.paragraph}>
            Don't have an account?{" "}
            <Link href="/CreateAccount" className={styles.link}>
              Sign up
            </Link>
          </p>
        </form>

        <div className={styles.orContainer}>
          <hr className={styles.divider} />
          <span className={styles.orText}>or</span>
          <hr className={styles.divider} />
        </div>

        <button
          className={`${styles.socialButton} ${styles.btn}`}
          onClick={() => signIn("google")}
        >
          <span>
            <svg viewBox="0 0 32 32" width="24" height="24">
              <defs>
                <path
                  id="A"
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                />
              </defs>
              <clipPath id="B">
                <use xlinkHref="#A" />
              </clipPath>
              <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" />
                <path
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                  clipPath="url(#B)"
                  fill="#ea4335"
                />
                <path
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                  clipPath="url(#B)"
                  fill="#34a853"
                />
                <path
                  d="M48 48L17 24l-4-3 35-10z"
                  clipPath="url(#B)"
                  fill="#4285f4"
                />
              </g>
            </svg>
          </span>
          <span>Sign in with Google</span>
        </button>

      </div>
    </div>
  );
}
