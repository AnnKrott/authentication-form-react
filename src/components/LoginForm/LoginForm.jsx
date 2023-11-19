import { useState } from 'react'
import classes from './LoginForm.module.css'
import user from '../../user.json'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const messageText = {
    warning: 'Не все поля заполнены!',
    success: 'Регистрация прошла успешно!',
    passwordValidation: 'Длина пароля должна быть более 5 символов!',
    emailValidation: 'Некорректный адрес электронной почты!',
    incorrectEmail: 'Неверный адрес электронной почты!',
    incorrectPassword: 'Неверный пароль!',
  }

  const validatePassword = () => {
    return (password.length > 5);
  }

  const validateEmail = () => {
    return /@/.test(email);
  }

  const validate = () => {
    if (email === '' || email === null) {
      setMessage(messageText.warning)
      return false
    }
    if (password === '' || password === null) {
      setMessage(messageText.warning)
      return false
    }
    if (!validatePassword()) {
      setMessage(messageText.passwordValidation)
      return false
    }
    if (!validateEmail()) {
      setMessage(messageText.emailValidation)
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    if (validate()) {     

      fetch("https://jsonplaceholder.typicode.com/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(email, password)
      })

      if (email !== user.user.email) {
        e.preventDefault()
        setMessage(messageText.incorrectEmail)
      } else if (password !== user.user.password) {
        e.preventDefault()
        setMessage(messageText.incorrectPassword)
      } else {
        setMessage(messageText.success)
        localStorage.setItem('user', email)
      }

    } else {
      e.preventDefault()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.LoginForm}>
      <span className={classes.title}>Вход</span>
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        type="text" 
        placeholder="Введите email"/>

      <input 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        type="password" 
        placeholder="Введите пароль" />
      <button type="submit" className={classes.button}>Войти</button>

      <div className={classes.credentials}>
        <div>Верный email: test@test.com</div>
        <div>Верный пароль: 123456</div>
      </div>

      <div className={(message === messageText.success) ? classes.green : classes.red}>{message}</div>

    </form>
  )
}