import { signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../api/firebase.config'
import { signingIn } from '../../stateManagement/reducers/userReducer'
import DemoLogin from '../DemoLogin'

const LoginComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
        const refreshToken = userCredential._tokenResponse.refreshToken
        sessionStorage.setItem('Auth Token', refreshToken)
        dispatch(signingIn())
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
          <div className="bg-red-500 p-2 rounded-sm text-center text-slate-100">
            {errorMessage}
          </div>
        )}
      </div>
      <div className="absolute inset-0 flex flex-col p-10 justify-center items-center">
        <div className="items-start">
          <div className="my-8 text-2xl font-medium text-center text-slate-100">
            Sign In!
          </div>

          <div>
            <div className="my-3 text-slate-300">Email</div>
            <div>
              <input
                className="bg-blue-50 my-2 rounded-xl p-2 w-72  focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="my-3 text-slate-300">Password</div>
            <div>
              <input
                className="bg-blue-50 my-2 rounded-xl p-2 w-72 focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="text-slate-50 py-2 hover:text-slate-300">
            New User?{' '}
            <Link className="hover:text-pink-500" to="/signup">
              Sign up!
            </Link>
          </div>
          <div className="flex gap-2 my-5 items-center">
            <button
              className="bg-blue-600 px-8 rounded-xl p-2 shadow-2xl text-slate-200 font-medium hover:bg-blue-500"
              onClick={login}
              disabled={email.length === 0 || password.length === 0}
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
