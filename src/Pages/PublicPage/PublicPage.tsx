import Spline from '@splinetool/react-spline'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getLinks from '../../api/getLinks'
import PublicLinkCard from '../../components/PublicLinkCard'

const PublicPage = () => {
  const { userId } = useParams()
  const [links, setLinks] = useState<any[]>([])

  useEffect(() => {
    console.log(userId)
    getLinks(userId).then((data) => {
      setLinks(data)
    })
  }, [userId])

  return (
    <div className="h-screen relative bg-slate-800">
      {/* <Spline scene="https://prod.spline.design/0sFGapfOgEyRi8FA/scene.splinecode" /> */}

      <div className="flex gap-4 flex-wrap justify-center pt-20 flex-col items-center">
        {links.map((item) => {
          return <PublicLinkCard key={item.link} linkData={item} />
        })}
      </div>
    </div>
  )
}

export default PublicPage
