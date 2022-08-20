import { FiEdit2 } from 'react-icons/fi'
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
  // eslint-disable-next-line no-unused-vars
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
    <div className="bg-slate-50 p-2 px-4 text-sm flex gap-4 items-center whitespace-normal shadow-soft-ui-v2 rounded-lg hover:scale-110">
      <div className="flex flex-col gap-4 w-64 h-24 ">
        <div className="flex flex-col gap-4">
          {editFlag ? (
            <input
              type="text"
              value={newLinkType}
              onChange={(e) => setNewLinkType(e.target.value)}
              className=" p-2 outline-none rounded bg-slate-50"
              placeholder="Type"
              autoFocus={true}
            />
          ) : (
            <div className="flex gap-2">
              <div className="truncate">Type: {linkType}</div>
              <FiEdit2
                size={16}
                className="text-slate-600 hover:text-slate-900 hover:cursor-pointer"
                onClick={() => setEditFlag(!editFlag)}
              />
            </div>
          )}
          {editFlag ? (
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className=" p-2 outline-none rounded bg-slate-100"
              placeholder="Link"
              autoFocus={true}
            />
          ) : (
            <div className="flex gap-2  py-2">
              <div className="truncate text-slate-700">Link -{newLink} </div>
              <FiEdit2
                size={16}
                className="text-slate-600 hover:text-slate-900 hover:cursor-pointer"
                onClick={() => setEditFlag(!editFlag)}
              />
            </div>
          )}
        </div>
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
          {editFlag && <VscCheck size={20} />}
        </div>
      </div>
    </div>
  )
}

export default LinkCardComponent
