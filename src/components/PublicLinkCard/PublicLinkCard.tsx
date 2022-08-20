import { FunctionComponent } from 'react'

interface Props {
  linkData: any
}

const PublicLinkCard: FunctionComponent<Props> = (props: Props) => {
  const { linkData } = props
  const handleLinkClick = () => {
    window.location.replace(linkData.link)
  }
  return (
    <div
      className="flex flex-col justify-center items-center p-4 bg-slate-50 p-2 w-2/3 max-h-content rounded-2xl hover:scale-x-110 duration-500 hover:rounded-xl hover:cursor-pointer"
      onClick={handleLinkClick}
    >
      <div className="truncate text-lg font-bold ">{linkData.linkType}</div>
    </div>
  )
}

export default PublicLinkCard
