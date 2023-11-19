import { classNames } from '../../lib/classNames';
import { LoginForm } from '../LoginForm/LoginForm';
import classes from './LoginModal.module.css'

export const LoginModal = ({isModal, setIsModal}) => {

    const closeModal = () => {
      setIsModal(false)
    }

    const onContentClick = (e) => {
      e.stopPropagation()
    }

    const mods = {
      [classes.opened]: isModal
    }

    return (
        <div className={classNames(classes.LoginModal, mods)}>
            <div className={classes.overlay} onClick={closeModal}>
              <div className={classes.content} onClick={onContentClick}>
                <LoginForm/>
              </div>
            </div>
        </div>
    )
};


