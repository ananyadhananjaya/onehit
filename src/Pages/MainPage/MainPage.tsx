import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const MainPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/onehit')
    }

    if (!authToken) {
      navigate('/')
    }
  }, [])

  const handleSignOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('sign out')
        navigate('/')
        sessionStorage.clear()
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      })
  }

  return (
    <div>
      <div>Hello from MainPage!</div>
      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  )
}

export default MainPage
