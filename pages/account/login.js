import styles from '@/styles/AuthForm.module.css';
import {FaUser} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/layout";
import {useState, useContext, useEffect} from "react";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {login, error} = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      const toastId = toast.error(error);
      // Later, if you want to remove the toast programmatically:
      // toast.dismiss(toastId);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault()
    login({email, password})
  }

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email" value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <input type="submit" value="Login" className="btn"/>
        </form>

        <p>
          Don't have an account? <Link href='/account/register'>Register</Link>
        </p>
      </div>
    </Layout>
  )
}
