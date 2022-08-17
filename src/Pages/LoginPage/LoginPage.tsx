import { useDispatch, useSelector } from 'react-redux'
import LoginComponent from '../../components/LoginComponent'
import {
  decrement,
  increment
} from '../../stateManagement/reducers/mathReducer'

const LoginPage = () => {
  const count = useSelector((state: any) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div className="h-2/3 flex flex-col justify-center items-center">
      <LoginComponent />
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      {count}
    </div>
  )
}

export default LoginPage
