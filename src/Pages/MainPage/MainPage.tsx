import { getAuth, signOut, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, storage } from '../../api/firebase.config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import LinkCardComponent from '../../components/LinkCardComponent'

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
    <div className="flex flex-col gap-2 p-2 items-center bg-blue-50">
      {/* <div className="flex flex-col gap-4">
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
          className={`${
            file && file.name && file.name.length > 0
              ? 'bg-blue-100 px-8 rounded-xl p-2 shadow-2xl text-gray-600 font-medium hover:shadow-soft-ui hover:bg-blue-50'
              : 'bg-blue-50 px-8 rounded-xl p-2 shadow-2xl text-gray-600 font-medium'
          }`}
          onClick={() => handleUpload(file)}
          disabled={!(file && file.name && file.name.length > 0)}
        >
          Upload
        </button>
      </div>
      <div>
        <img src={imgUrl} alt="avatar" className="rounded-full w-48 h-48" />
      </div>
      <div>Welcome {email}</div>
      <div>Welcome {displayname}</div> */}
      <div className="w-11/12 md:h-80 h-max-content p-2 flex flex-col bg-slate-50 rounded-xl ">
        <div className="w-full h-40 bg-slate-300 rounded-tr-xl rounded-tl-xl"></div>
        <div className="flex rounded-full w-36 h-36 bg-slate-50 relative bottom-12 left-2">
          <img
            src={imgUrl}
            alt="Profile Picture"
            className="w-32 h-32 m-auto bg-black rounded-full"
          />
        </div>
        <div className="flex sm:justify-between flex-col sm:flex-row justify-center  px-2">
          <div>
            <div className="font-medium text-lg text-slate-600">
              {displayname}
            </div>
            <div className="text-slate-500">Software Engineer</div>
            <div className="text-slate-500">Los Angeles, California</div>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-500">{email}</div>
            <div className="text-sm font-bold text-slate-500">
              +01 7698 98897
            </div>
          </div>
        </div>
      </div>
      <div className="w-9/12 pt-10 flex flex-wrap justify-center gap-y-8 gap-x-4">
        <LinkCardComponent />
        <LinkCardComponent />

        <LinkCardComponent />
        <LinkCardComponent />

        <LinkCardComponent />
        <LinkCardComponent />
      </div>
    </div>
  )
}

export default MainPage
