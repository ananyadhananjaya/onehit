import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { useState } from 'react'
import createLink from '../../api/createLink'
import deleteLink from '../../api/deleteLink'

interface Props {
  link: string
  linkType: string
  userId: string | undefined
}

const LinkCardComponent = (props: Props) => {
  const { link, linkType, userId } = props
  const [editFlag, setEditFlag] = useState<boolean>(false)
  const [newLink, setNewLink] = useState<string>(link)

  const handleLinkUpdate = () => {
    setEditFlag(!editFlag)
    createLink(userId, linkType, newLink)
  }

  const handleDelete = () => {
    deleteLink(userId, linkType)
  }

  return (
    <div className="bg-zinc-50 p-2 px-4 text-sm flex gap-4 items-center whitespace-normal shadow-soft-ui-v2 rounded-lg hover:scale-110">
      <div className="flex flex-col gap-4">
        <div>Type: {linkType}</div>
        {editFlag ? (
          <div>
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className=" p-2 outine-none rounded-xl bg-slate-50"
              onBlur={handleLinkUpdate}
            />
          </div>
        ) : (
          <div>Link -{newLink} </div>
        )}
      </div>
      <div className="text-gray-400 flex flex-col gap-4 hover:cursor-pointer">
        <div className="hover:text-gray-800" onClick={handleDelete}>
          <AiOutlineDelete size={20} />
        </div>
        <div
          className="hover:text-gray-800"
          onClick={() => setEditFlag(!editFlag)}
        >
          <FaRegEdit size={18} />
        </div>
      </div>
    </div>
  )
}

export default LinkCardComponent
