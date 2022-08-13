import { signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../api/firebase.config'

const LoginComponent = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorFlag, setErrorFlag] = useState<boolean>(false)

  useEffect(() => {
    setErrorFlag(false)
  }, [email, password])

  const Login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        // Signed in
        const user = userCredential.user
        const refreshToken = userCredential._tokenResponse.refreshToken
        sessionStorage.setItem('Auth Token', refreshToken)
        console.log('user', user)

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
    <div>
      <div className="top-0 absolute">
        {errorFlag && (
          <div className="bg-red-500 w-screen p-2 rounded-sm text-center text-slate-100">
            {errorMessage}
          </div>
        )}
      </div>
      <div className="h-screen flex flex-col justify-center items-center bg-blue-50">
        <div className="items-start">
          <div className="my-8 text-2xl font-medium">Sign In!</div>

          <div>
            <div className="my-3">Email</div>
            <div>
              <input
                className="bg-blue-50 my-2 rounded-xl p-2 shadow-soft-ui focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="my-3">Password</div>
            <div>
              <input
                className="bg-blue-50 my-2 rounded-xl p-2 shadow-soft-ui focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="my-5 items-center">
            <button
              className="bg-blue-100 px-10 rounded-xl p-2 shadow-2xl text-gray-600 font-medium hover:shadow-soft-ui hover:bg-blue-50"
              onClick={Login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
