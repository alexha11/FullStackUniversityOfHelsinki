import { useSelector, useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.noti)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    
    <div>
      {notification === '' ? <div></div> : <div style={style}>{notification}</div>}
    </div>

  )
}


export default Notification