import React, { useState } from 'react'
import { instantiateApi } from './api/instantiateApi'

const App: React.FunctionComponent = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [state, setState] = useState('')

  const onLogin = async () => {
    const success = await instantiateApi(state)

    console.log(success)

    if (!success) {
      alert('Your API key is not valid')
    } else {
      setLoggedIn(true)
    }
  }

  return (
    <div>
      Default app
      <br />
      <input placeholder="API KEY" value={state} onChange={(e) => setState(e.target.value)} />
      <button onClick={onLogin}>Login</button>
      {loggedIn && <h3>Logged in!</h3>}
    </div>
  )
}

export default App
