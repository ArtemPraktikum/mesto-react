import { useEffect, useState } from 'react'
import { api } from '../utils/Api.js'
function Main(props) {
  // переменные состояния, отвечающие за данные пользователя
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')

  useEffect(() => {
    // Данные необходимые при загрузке страницы
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userArray, cardsArray]) => {
        setUserName(userArray.name)
        setUserDescription(userArray.about)
        setUserAvatar(userArray.avatar)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar-section'>
          <img src={userAvatar} alt='Аватар профиля' className='profile__avatar' />
          <button type='button' className='profile__avatar-button' onClick={props.onEditAvatar} />
        </div>
        <div className='profile__info'>
          <div className='profile__heading'>
            <h1 className='profile__title'>{userName}</h1>
            <button type='button' className='profile__edit-button' onClick={props.onEditProfile} />
          </div>
          <p className='profile__subtitle'>{userDescription}</p>
        </div>
        <button type='button' className='profile__add-button' onClick={props.onAddPlace} />
      </section>
      <section className='elements' />
    </main>
  )
}
export default Main
