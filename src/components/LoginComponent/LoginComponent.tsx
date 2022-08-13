const LoginComponent = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-blue-50">
      <div className="items-start">
        <div className="my-8 text-2xl font-medium">Sign In!</div>
        <div>
          <div className="my-3">Username</div>
          <div>
            <input
              className="bg-blue-50 my-2 rounded-xl p-2 shadow-soft-ui focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
              type="text"
            />
          </div>
        </div>
        <div>
          <div className="my-3">Password</div>
          <div>
            <input
              className="bg-blue-50 my-2 rounded-xl p-2 shadow-soft-ui focus:text-gray-700 focus:bg-slate-50 focus:outline-none"
              type="text"
            />
          </div>
        </div>
        <div className="my-5 items-center">
          <button className="bg-blue-100 px-10 rounded-xl p-2 shadow-2xl text-gray-600 font-medium hover:shadow-soft-ui hover:bg-blue-50">
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
