import { FunctionComponent } from 'react'
import { AiOutlinePlus, AiOutlineLink } from 'react-icons/ai'
import { HiOutlineLogout } from 'react-icons/hi'

interface Props {
  imgUrl: string
  onSignOut: () => void
  onAddLink: () => void
  onEdit: () => void
  publicLink: string
}

const Sidebar: FunctionComponent<Props> = (props: Props) => {
  const { imgUrl, onSignOut, onAddLink, onEdit, publicLink } = props
  return (
    <div className="bg-slate-100 h-screen flex flex-col justify-end p-1 gap-4 sticky top-0 left-0 w-16 shadow-xl">
      <div
        className="bg-slate-300 rounded-full h-12 flex justify-center items-center w-full p-4 text-slate-600 hover:rounded-xl hover:scale-x-110 duration-100 hover:cursor-pointer"
        onClick={() => {
          window.open(publicLink)
        }}
      >
        <AiOutlineLink size={22} />
      </div>
      <div
        className="bg-slate-300 rounded-full h-12 flex justify-center items-center w-full p-4 text-slate-600 hover:rounded-xl hover:scale-x-110 duration-100 hover:cursor-pointer"
        onClick={onAddLink}
      >
        <AiOutlinePlus size={22} />
      </div>
      <div
        className="bg-slate-300 rounded-full h-12 flex justify-center items-center w-full p-4 text-slate-600 hover:rounded-xl hover:scale-x-110 duration-100 hover:cursor-pointer"
        onClick={onSignOut}
      >
        <HiOutlineLogout size={24} />
      </div>
      <img
        src={imgUrl}
        alt="Profile Picture"
        className="w-12 h-12 bg-black rounded-full hover:scale-x-110 duration-100 hover:cursor-pointer"
        onClick={onEdit}
      />
    </div>
  )
}

export default Sidebar
