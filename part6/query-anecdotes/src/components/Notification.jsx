const Notification = (noti) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  //console.log('duong test ' + JSON.stringify(noti.noti))
  
  return (
    <div>
      {
      noti === '' 
        ? <div></div>
        : <div style={style}>{noti.noti}</div> 
      }
    </div>
  )
}

export default Notification
