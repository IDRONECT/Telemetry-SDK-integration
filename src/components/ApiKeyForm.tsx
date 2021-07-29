import React, { useState } from 'react'
import { instantiateApi } from '../api/instantiateApi'

interface Props {
  loggedIn: boolean
  setLoggedIn: (value: boolean) => void
}

const ApiKeyForm: React.FunctionComponent<Props> = ({ loggedIn, setLoggedIn }: Props) => {
  const [state, setState] = useState('')

  const onLogin = async () => {
    const success = await instantiateApi(state)

    if (!success) {
      alert('Your API key is not valid')
    } else {
      setLoggedIn(true)
    }
  }

  const onLogout = () => {
    setLoggedIn(false)
    setState('')
  }

  return (
    <>
      <input placeholder="API KEY" value={state} onChange={(e) => setState(e.target.value)} />
      {!loggedIn && <button onClick={onLogin}>Login</button>}
      {loggedIn && <button onClick={onLogout}>Logout</button>}
      {loggedIn && <h3>Logged in!</h3>}
    </>
  )
}

export default ApiKeyForm
