import './App.css'
import { v1 as uuid } from 'uuid'
import io from 'socket.io-client'

const App = () => {
  let mySocketIoClientId = uuid();
  let socket = null
  const openExternalApp = () => {
    window.location.href = 'du-web-protocol-electron-socket-server://open'
  }
  const sendMySocketId = () => {
    window.location.href = `du-web-protocol-electron-socket-server://${mySocketIoClientId}`
  }
  const connectToSocketServer = () => {
    if (!socket) {
      // socket = io.connect('http://localhost:8000')
      socket = io.connect('/') // proxy instead, for quick fix to cors
      socket.on('cpu data', (data) => {
        console.log('cpu data: ', data)
      })
    }
  }
  const requestNativeData = () => {
    socket.emit('get cpu')
  }
  const closeExternalApp = () => {
    if (socket) {
      socket.close()
    }
    window.location.href = 'du-web-protocol-electron-socket-server://close'
  }
  return (
    <>
      <div><button onClick={openExternalApp}>open external app</button></div>
      <div><button onClick={sendMySocketId}>send my socket id</button></div>
      <div><button onClick={connectToSocketServer}>connect to socket server</button></div>
      <div><button onClick={requestNativeData}>request native data</button></div>
      <div><button onClick={closeExternalApp}>close external server app</button></div>
    </>
  );
}

export default App;
