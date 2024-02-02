import { useSelector, useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.noti)
  dispatch(setNotification('test'))
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    
    <div style={style}>
      {notification}
    </div>
  )
}


export default Notification