import { onAuthStateChanged, updateEmail, updateProfile } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, storage } from '../../api/firebase.config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const EditPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [displayname, setDisplayname] = useState<string | null>('')
  const [imgUrl, setImgUrl] = useState<any>()
  const [email, setEmail] = useState<string | null>('')
  const [file, setFile] = useState<any>()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user !== null) {
          user.providerData.forEach((profile) => {
            setEmail(profile.email)
            setDisplayname(profile.displayName)
          })
        }
        if (auth.currentUser) {
          setImgUrl(auth.currentUser.photoURL)
        }
      }
    })
  }, [])

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
          setFile('')
        })
        .catch((error) => {
          // An error occurred
          console.log(error)
        })
    }
  }

  const handleUpdate = () => {
    if (auth.currentUser) {
      if (username && username.length > 0) {
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
      if (email && email.length > 0) {
        updateEmail(auth.currentUser, email)
          .then(() => {
            // Email updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          })
      }
    }
  }

  const handlePictureInput = (e: any) => {
    setFile(e.target.files[0])
  }
  return (
    <div className="flex flex-col p-10 justify-center h-screen items-center bg-slate-900">
      <div className="">
        <div className="flex justify-center pt-12">
          <div className="flex rounded-full w-36 h-36 bg-slate-50 relative bottom-12 left-2">
            <img
              src={imgUrl}
              alt="Profile Picture"
              className="w-32 h-32 m-auto bg-black rounded-full"
            />
          </div>
        </div>
        <div>
          <div className="text-slate-50">Email</div>
          <div>
            <input
              className="bg-blue-50 my-2 rounded-xl p-2 w-72 focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="text-slate-50">Username</div>
          <div>
            <input
              className="bg-blue-50 my-2 rounded-xl p-2 w-72 focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <div className="text-slate-50">
            <input type="file" onChange={handlePictureInput} />
          </div>
          <div>
            <button
              className={`${
                file && file.name && file.name.length > 0
                  ? 'bg-blue-100 px-8 rounded-xl p-2 shadow-2xl text-gray-600 font-medium hover:shadow-soft-ui hover:bg-blue-50'
                  : 'bg-red-200 px-8 rounded-xl p-2 shadow-2xl text-gray-600 font-medium'
              }`}
              onClick={() => handleUpload(file)}
              disabled={!(file && file.name && file.name.length > 0)}
            >
              Upload
            </button>
          </div>
        </div>
        <div className="pt-4 flex gap-4">
          <button
            className={
              'bg-blue-400 px-8 rounded-xl p-2 shadow-2xl text-slate-50 font-medium hover:bg-blue-600 hover:text-slate-50'
            }
            onClick={() => handleUpdate()}
          >
            Update
          </button>
          <button
            className={
              'bg-blue-400 px-8 rounded-xl p-2 shadow-2xl text-slate-50 font-medium hover:bg-blue-600 hover:text-slate-50'
            }
            onClick={() => navigate('/onehit')}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditPage
