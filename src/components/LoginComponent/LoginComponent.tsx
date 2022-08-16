import { signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../api/firebase.config'
import DemoLogin from '../DemoLogin'

const LoginComponent = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorFlag, setErrorFlag] = useState<boolean>(false)

  useEffect(() => {
    setErrorFlag(false)
  }, [email, password])

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        // Signed in
        const user = userCredential.user
        const refreshToken = userCredential._tokenResponse.refreshToken
        sessionStorage.setItem('Auth Token', refreshToken)

        //ananya.dhananjaya1998@gmail.com
        //test123
        navigate('/onehit')
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/wrong-password':
            setErrorMessage('Invalid Password')
            break
          case 'auth/user-not-found':
            setErrorMessage('Invalid Email')
            break
          default:
            setErrorMessage('Something went wrong. Please try again later.')
        }
        setErrorFlag(true)
      })
  }

  return (
    <>
      <div className="top-0 absolute">
        {errorFlag && (
          <div className="bg-red-500 w-screen p-2 rounded-sm text-center text-slate-100">
            {errorMessage}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center p-10 items-center bg-blue-50">
        <div className="items-start">
          <div className="my-8 text-2xl font-medium text-center text-gray-600">
            Sign In!
          </div>

          <div>
            <div className="my-3">Email</div>
            <div>
              <input
                className="bg-blue-50 my-2 rounded-xl p-2 w-72 shadow-soft-ui focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="my-3">Password</div>
            <div>
              <input
                className="bg-blue-50 my-2 rounded-xl p-2 w-72 shadow-soft-ui focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="text-slate-500 py-2 hover:text-slate-700">
            New User?{' '}
            <Link className="hover:text-blue-500" to="/signup">
              Sign up!
            </Link>
          </div>
          <div className="flex gap-2 my-5 items-center">
            <button
              className="bg-blue-100 px-8 rounded-xl p-2 shadow-2xl text-gray-600 font-medium hover:shadow-soft-ui hover:bg-blue-50"
              onClick={login}
            >
              Login
            </button>
            <DemoLogin />
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginComponent
