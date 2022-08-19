import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../api/firebase.config'
import Spline from '@splinetool/react-spline'

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

      <div className=" bg-blue-50 bg-slate-900 h-screen relative">
        <Spline scene="https://prod.spline.design/0sFGapfOgEyRi8FA/scene.splinecode" />
        <div className="items-start absolute inset-0 flex flex-col p-10 justify-center items-center">
          <div className="my-8 text-2xl font-medium text-center text-slate-100">
            Sign Up!
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
                className="bg-blue-50 my-2 rounded-xl p-2 w-72  focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 my-5 items-center">
            <button
              className="bg-blue-100 w-32 rounded-xl py-2 shadow-2xl text-gray-600 font-medium  hover:bg-red-500 hover:text-slate-200"
              onClick={signUp}
            >
              Sign Up
            </button>
            <button
              className="bg-blue-100  rounded-xl py-2 w-32 shadow-2xl text-gray-600 font-medium hover:bg-blue-600 hover:text-slate-200"
              onClick={() => navigate('/login')}
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
