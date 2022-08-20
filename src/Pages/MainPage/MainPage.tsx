import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../../api/firebase.config'
import LinkCardComponent from '../../components/LinkCardComponent'
import { FiEdit2 } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'
import getLinks from '../../api/getLinks'
import { useDispatch } from 'react-redux'
import { signingout } from '../../stateManagement/reducers/userReducer'
import { addLink } from '../../stateManagement/reducers/linksReducer'
import { MdOutlineContentCopy } from 'react-icons/md'
import TopBar from '../../components/TopBar'

interface LinkType {
  link: string
  linkType: string
}

const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [displayname, setDisplayname] = useState<string | null>('')
  const [imgUrl, setImgUrl] = useState<any>()
  const [email, setEmail] = useState<string | null>('')
  const [allLinks, setAllLinks] = useState<LinkType[]>([])
  const [addNewLink, setAddNewLink] = useState<boolean>(false)
  const [publicLink, setPublicLink] = useState<string>('')

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
        if (user !== null) {
          user.providerData.forEach((profile) => {
            setEmail(profile.email)
            setDisplayname(profile.displayName)
          })
          getLinks(auth.currentUser?.uid).then((data) => {
            setAllLinks(data)
            dispatch(addLink(data))
          })
        }
        if (auth.currentUser) {
          setImgUrl(auth.currentUser.photoURL)
          setPublicLink('http://127.0.0.1:5173/onehit/' + auth.currentUser.uid)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser) {
      setImgUrl(auth.currentUser.photoURL)
      setPublicLink('http://127.0.0.1:5173/onehit/' + auth.currentUser.uid)
    }
  }, [auth])

  const handleSignOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(signingout())
        navigate('/')
        sessionStorage.clear()
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      })
  }

  const fetchLink = () => {
    getLinks(auth.currentUser?.uid).then((data: any[]) => {
      setAllLinks(data)
      dispatch(addLink(data))
    })
  }

  return (
    <div className="flex flex-col gap-2 p-1 h-full items-center bg-blue-50">
      <TopBar displayName={displayname} email={email} />
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
          </div>
          <div className="flex flex-col justify-end items-end gap-1">
            <div
              className="text-sm flex font-bold text-slate-500"
              onClick={() => navigate('/editUser')}
            >
              <div className="hover:cursor-pointer p-2 hover:bg-slate-200  rounded-full p-2 hover:scale-110">
                Edit Profile
              </div>
            </div>
            <div className="text-sm flex font-bold text-slate-500 gap-2">
              <div className="flex  items-center">
                <MdOutlineEmail size={20} />
              </div>
              <div>{email}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <div
          className="px-4 py-2 bg-blue-300 rounded-full hover:shadow-xl shadow-2xl hover:cursor-pointer"
          onClick={() => setAddNewLink(!addNewLink)}
        >
          Add New Link
        </div>

        <div
          className="px-4 py-2 bg-blue-300 rounded-full hover:shadow-xl shadow-2xl hover:cursor-pointer"
          onClick={fetchLink}
        >
          Get Links
        </div>
        <div
          className="px-4 py-2 bg-blue-300 rounded-full hover:shadow-xl shadow-2xl hover:cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out!
        </div>
      </div>

      <div className="w-full flex truncate items-center justify-center gap-2">
        <div
          className="text-blue-600 hover:cursor-pointer underline"
          onClick={() => {
            window.open(publicLink)
          }}
        >
          My Public Link: {publicLink}
        </div>
        <div className="text-slate-700 hover:text-slate-900">
          <MdOutlineContentCopy size={18} />
        </div>
      </div>
      <div className="w-9/12 pt-10 flex flex-wrap justify-center gap-y-8 gap-x-6">
        {addNewLink && (
          <LinkCardComponent
            key="testKey"
            link=""
            linkType=""
            userId={auth.currentUser?.uid}
            fetchLink={fetchLink}
            setAddNewLink={setAddNewLink}
          />
        )}
        {allLinks.map((item) => {
          return (
            <LinkCardComponent
              key={item.linkType}
              link={item.link}
              linkType={item.linkType}
              userId={auth.currentUser?.uid}
              fetchLink={fetchLink}
              setAddNewLink={setAddNewLink}
            />
          )
        })}
      </div>
    </div>
  )
}

export default MainPage
