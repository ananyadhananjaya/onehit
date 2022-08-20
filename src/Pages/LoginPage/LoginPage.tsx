import LoginComponent from '../../components/LoginComponent'
import Spline from '@splinetool/react-spline'
import FooterComponent from '../../components/FooterComponent'

const LoginPage = () => {
  return (
    <div className="bg-slate-900 h-screen relative">
      <Spline scene="https://prod.spline.design/0sFGapfOgEyRi8FA/scene.splinecode" />

      <div className="absolute inset-0">
        <LoginComponent />
      </div>
      <div className="flex justify-center">
        <FooterComponent />
      </div>
    </div>
  )
}

export default LoginPage
