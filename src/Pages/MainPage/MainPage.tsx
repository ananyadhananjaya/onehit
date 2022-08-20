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
import Sidebar from '../../components/Sidebar'

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

  const handleAddLink = () => {
    setAddNewLink(!addNewLink)
  }

  const handleEdit = () => {
    navigate('/editUser')
  }

  return (
    <div className="flex  overlflow-schroll">
      <Sidebar
        imgUrl={imgUrl}
        onAddLink={handleAddLink}
        onSignOut={handleSignOut}
        onEdit={handleEdit}
        publicLink={publicLink}
      />
      <div className="flex flex-col gap-2 p-1  w-full items-center bg-blue-50">
        <TopBar displayName={displayname} email={email} />

        <div className="w-9/12  pt-10 flex flex-wrap justify-center gap-y-8 gap-x-6">
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
    </div>
  )
}

export default MainPage
