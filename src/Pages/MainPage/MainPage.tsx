import {
  getAuth,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, storage } from '../../api/firebase.config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import LinkCardComponent from '../../components/LinkCardComponent'
import { FiEdit2 } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'

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

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        if (user !== null) {
          user.providerData.forEach((profile) => {
            setEmail(profile.email)
            setDisplayname(profile.displayName)
          })
        }
        if (auth.currentUser) {
          setImgUrl(auth.currentUser.photoURL)
        }
      } else {
        console.log('logged ot')
      }
    })
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

  return (
    <div className="flex flex-col gap-2 p-2 items-center bg-blue-50">
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
          <div className="flex flex-col justify-end items-end gap-1">
            <div
              className="text-sm flex font-bold text-slate-500"
              onClick={() => navigate('/editUser')}
            >
              <div className="flex  items-centerhover:cursor-pointer hover:bg-slate-200 rounded-full p-2 hover:scale-110">
                <FiEdit2
                  size={16}
                  fontWeight="regular"
                  className="text-gray-400"
                />
              </div>
              <div className="hover:cursor-pointer p-2 hover:bg-slate-200  rounded-full p-2 hover:scale-110">
                Edit
              </div>
            </div>
            <div className="text-sm flex font-bold text-slate-500 gap-2">
              <div className="flex  items-center">
                <MdOutlineEmail size={20} />
              </div>
              <div>{email}</div>
            </div>
            <div className="text-sm flex font-bold text-slate-500 gap-1">
              <div className="flex  items-center">
                <BsTelephone size={18} />
              </div>
              <div> +01 7698 98897</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-9/12 pt-10 flex flex-wrap justify-center gap-y-8 gap-x-6">
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
