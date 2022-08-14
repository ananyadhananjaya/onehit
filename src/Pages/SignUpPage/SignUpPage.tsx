import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../api/firebase.config'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorFlag, setErrorFlag] = useState<boolean>(false)

  useEffect(() => {
    setErrorFlag(false)
  }, [email, password])

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        sessionStorage.setItem('Auth Token', user.refreshToken)
        navigate('/onehit')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        switch (errorCode) {
          case 'auth/wrong-password':
            setErrorMessage('Invalid Password')
            break
          case 'auth/user-not-found':
            setErrorMessage('Invalid Email')
            break
          case 'auth/weak-password':
            setErrorMessage('Please have a strong Password')
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
      <div className="flex flex-col p-10 justify-center items-center bg-blue-50">
        <div className="items-start">
          <div className="my-8 text-2xl font-medium text-center text-gray-600">
            Sign Up!
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

          <div className="flex gap-4 my-5 items-center">
            <button
              className="bg-blue-100 px-8 rounded-xl p-2 shadow-2xl text-gray-600 font-medium hover:shadow-soft-ui hover:bg-blue-50"
              onClick={signUp}
            >
              Sign Up
            </button>
            <button
              className="bg-blue-100 px-8 rounded-xl p-2 w-32 shadow-2xl text-gray-600 font-medium hover:shadow-soft-ui hover:bg-blue-50"
              onClick={() => navigate('/')}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
