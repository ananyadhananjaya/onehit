import { FunctionComponent, useEffect, useState } from 'react'

interface Props {
  displayName: string | null
  email: string | null
}

const TopBar: FunctionComponent<Props> = (props: Props) => {
  const { displayName, email } = props
  const [name, setName] = useState<string>('')
  useEffect(() => {
    if (displayName) {
      let [temp] = displayName.split(' ')
      setName(temp)
    } else {
      setName('John Doe')
    }
  }, [])
  return (
    <div className="flex justify-between p-2 items-center px-4 bg-slate-300 w-full h-14 shadow-lg rounded-tr rounded-tl">
      <div className="tracking-wide font-medium text-lg text-slate-800">
        👋, {name}!
      </div>
      <div className="text-slate-700 font-semibold">{email}</div>
    </div>
  )
}

export default TopBar
