import { getAuth, signOut, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, storage } from '../../api/firebase.config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const MainPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [displayname, setDisplayname] = useState<string | null>('')
  const [imgUrl, setImgUrl] = useState<any>()
  const [email, setEmail] = useState<string | null>('')
  const [file, setFile] = useState<any>()

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/onehit')
    }

    if (!authToken) {
      navigate('/')
    }
    const user = auth.currentUser

    if (user !== null) {
      user.providerData.forEach((profile) => {
        setEmail(profile.email)
        setDisplayname(profile.displayName)
      })
    }
    if (auth.currentUser) {
      setImgUrl(auth.currentUser.photoURL)
    }
  }, [])

  useEffect(() => {
    if (auth.currentUser) {
      setImgUrl(auth.currentUser.photoURL)
    }
  }, [auth])

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

  const updateName = () => {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: username
      })
        .then(() => {
          // Profile updated!
          setDisplayname(username)
        })
        .catch((error) => {
          // An error occurred
          console.log(error)
        })
    }
  }

  const handleUpload = async (file: any) => {
    if (auth.currentUser) {
      const fileRef = ref(storage, auth.currentUser.uid + '.jpg')
      const snapshot = await uploadBytes(fileRef, file)
      const picURL = await getDownloadURL(fileRef)
      updateProfile(auth.currentUser, {
        photoURL: picURL
      })
        .then(() => {
          // Profile updated!
          setImgUrl(picURL)
        })
        .catch((error) => {
          // An error occurred
          console.log(error)
        })
    }
  }

  const handlePictureInput = (e: any) => {
    setFile(e.target.files[0])
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="my-3">Username</div>
          <div>
            <input
              className="bg-blue-50 my-2 rounded-xl p-2 w-72 shadow-soft-ui focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            className="bg-blue-100 px-8 rounded-xl p-2 shadow-2xl text-gray-600 font-medium hover:shadow-soft-ui hover:bg-blue-50"
            onClick={updateName}
          >
            Update Name!
          </button>
        </div>
        <div>
          <button
            className="bg-blue-100 px-8 rounded-xl p-2 shadow-2xl text-gray-600 font-medium hover:shadow-soft-ui hover:bg-blue-50"
            onClick={handleSignOut}
          >
            Sign Out!
          </button>
        </div>
      </div>
      <div>
        <input type="file" onChange={handlePictureInput} />
      </div>
      <div>
        <button
          className="bg-blue-100 px-8 rounded-xl p-2 shadow-2xl text-gray-600 font-medium hover:shadow-soft-ui hover:bg-blue-50"
          onClick={() => handleUpload(file)}
        >
          Upload
        </button>
      </div>
      <div>
        <img src={imgUrl} alt="avatar" className="rounded-full w-48 h-48" />
      </div>
      <div>Welcome {email}</div>
      <div>Welcome {displayname}</div>
    </div>
  )
}

export default MainPage
