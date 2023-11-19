import React, { useEffect, useState } from "react"
import classes from './MainPage.module.css'
import { LoginModal } from "../LoginModal/LoginModal"

export const MainPage = () => {
  const [isModal, setIsModal] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  const openModal = () => {
    setIsModal(true)
  }

  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (auth) {
      setIsAuth(true)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    setIsAuth(false)
  }


  return (
    <div className={classes.MainPage}>

      {!isAuth
      ? 
      <>
        <div className={classes.navbar}>
          <button className={classes.btn} onClick={openModal}>
            Войти
          </button>
        </div>
        <LoginModal setIsModal={setIsModal} isModal={isModal} />
      </>

      :
      <div className={classes.navbar}>
        <button 
          className={classes.btn} 
          onClick={logout} 
        >
          Выйти
        </button>
      </div>

      }

    </div>
  )
}
