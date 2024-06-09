import React, {useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

const LoginForm = ({onSubmit, buttonText}) => {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const {username, password} = event.target.elements
    onSubmit({username: username.value, password: password.value})
  }
  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        // value={username}
        // onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button type="submit">{buttonText}</button>
  </form>
}

const App = () => {
  const [openModal, setOpenModal] = useState('none')
  const closeModal = () => setOpenModal('none')

  const login = (formData) => {
    console.log('login', formData)
  }

  const register = (formData) => {
    console.log('register', formData)
  }

  return <>
    <Logo width="80" height="80" />
    <h1>Bookshelf</h1>
    <div>
      <button onClick={() => setOpenModal('login')}>Log in</button>
    </div>
    <div>
      <button onClick={() => setOpenModal('register')}>Register</button>
    </div>
    <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
      <div>
        <button onClick={closeModal}>Close</button>
      </div>
      <LoginForm onSubmit={login} buttonText="Login" />
    </Dialog>
    <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
      <div>
        <button onClick={closeModal}>Close</button>
      </div>
      <LoginForm onSubmit={register} buttonText="Register" />
    </Dialog>
  </>
}

createRoot(document.getElementById('root'))
  .render(<App />)