import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const DemoLogin = () => {
  const navigate = useNavigate()
  const demoLogin = () => {
    const auth = getAuth()
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
        navigate('/onehit')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        // ...
      })
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        sessionStorage.setItem('Auth Token', user.accessToken)
      } else {
        // User is signed out
        navigate('/')
      }
    })
  }
  return (
    <button
      className="bg-red-200 px-10 rounded-xl p-2 shadow-2xl text-gray-600 font-medium hover:shadow-xl hover:bg-red-400 "
      onClick={demoLogin}
    >
      Demo Login
    </button>
  )
}

export default DemoLogin
