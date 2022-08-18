import Spline from '@splinetool/react-spline'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-slate-900 h-screen relative">
      <Spline scene="https://prod.spline.design/0sFGapfOgEyRi8FA/scene.splinecode" />
      <div className="absolute top-0 p-16  ">
        <div className="font-extrabold text-5xl text-slate-200 hover:animate-bounce">
          One Hit
        </div>
        <div className="font-bold text-2xl text-slate-100">
          One Link for all your links.
        </div>
        <div className="text-3xl text-slate-200 pt-20 font-bold">
          How does it Work you ask?
        </div>
        <div className="text-xl text-slate-200 pt-2 font-medium">
          One Hit allows you to store all your links in one place. Choose to
          share your profile with all your social links to the world in just few
          simple steps and it's free.
        </div>
        <button
          className="text-slate-200 bg-slate-800 p-2 mt-2 max-w-content rounded-xl hover:cursor-pointer shadow-xl hover:bg-slate-700 hover:scale-x-110"
          onClick={() => navigate('/login')}
        >
          Get Started!
        </button>
      </div>
    </div>
  )
}

export default LandingPage
