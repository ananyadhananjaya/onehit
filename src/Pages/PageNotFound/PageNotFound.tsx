import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <div className="h-3/5 flex flex-col justify-center items-center">
      <div className="flex">
        <div className="text-9xl">4</div>
        <div className="text-9xl">0</div>
        <div className="text-9xl">4</div>
      </div>
      <div className=" flex flex-col gap-4 items-center">
        <div className="font-bold">Oops! Page not found.</div>
        <div className="font-medium">
          We couldn't find the page you are looking for.
        </div>
        <div>
          <button
            className="bg-blue-100 px-10 rounded-xl p-2 shadow-2xl text-gray-600 font-medium hover:shadow-soft-ui hover:bg-blue-50"
            onClick={handleBack}
          >
            Go back!
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
