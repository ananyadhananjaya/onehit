import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { VscCheck } from 'react-icons/vsc'
import { useState } from 'react'
import createLink from '../../api/createLink'
import deleteLink from '../../api/deleteLink'

interface Props {
  link: string
  linkType: string
  userId: string | undefined
  fetchLink: () => void
  setAddNewLink: (val: any) => void
}

const LinkCardComponent = (props: Props) => {
  const { link, linkType, userId, fetchLink, setAddNewLink } = props
  const [editFlag, setEditFlag] = useState<boolean>(false)
  const [newLink, setNewLink] = useState<string>(link)
  const [newLinkType, setNewLinkType] = useState<string>(linkType)

  const handleLinkUpdate = () => {
    setEditFlag(!editFlag)
    createLink(userId, newLinkType, newLink).then(() => {
      fetchLink()
    })
    setAddNewLink(false)
  }

  const handleDelete = () => {
    deleteLink(userId, linkType)
    fetchLink()
  }

  return (
    <div className="bg-zinc-50 p-2 px-4 text-sm flex gap-4 items-center whitespace-normal shadow-soft-ui-v2 rounded-lg hover:scale-110">
      <div className="flex flex-col gap-4">
        {editFlag ? (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={newLinkType}
              onChange={(e) => setNewLinkType(e.target.value)}
              className=" p-2 outine-none rounded-xl bg-slate-200"
              placeholder="Type"
            />
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className=" p-2 outine-none rounded-xl bg-slate-200"
              placeholder="Link"
            />
          </div>
        ) : (
          <div>
            <div>Type: {linkType}</div>
            <div>Link -{newLink} </div>
          </div>
        )}
      </div>
      <div className="text-gray-400 flex flex-col gap-4 hover:cursor-pointer">
        <div className="hover:text-gray-800" onClick={handleDelete}>
          <AiOutlineDelete size={20} />
        </div>
        <div
          className="hover:text-gray-800"
          onClick={() =>
            editFlag ? handleLinkUpdate() : setEditFlag(!editFlag)
          }
        >
          {editFlag ? <VscCheck size={20} /> : <FaRegEdit size={18} />}
        </div>
      </div>
    </div>
  )
}

export default LinkCardComponent
