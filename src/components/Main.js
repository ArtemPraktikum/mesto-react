import { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { api } from '../utils/Api.js'
import Card from './Card.js'
function Main(props) {
  const traverseUserContext = useContext(CurrentUserContext)
  // переменные состояния, отвечающие за карточки
  const [cards, setСards] = useState([])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like._id === traverseUserContext._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setСards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        const newCardArr = cards.filter((item) => (item._id === card._id ? null : newCard))
        setСards(newCardArr)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    // Данные юзера необходимые при загрузке страницы
    api
      .getInitialCards()
      .then((cardsArray) => {
        setСards(cardsArray)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar-section'>
          <img src={traverseUserContext.avatar} alt='Аватар профиля' className='profile__avatar' />
          <button type='button' className='profile__avatar-button' onClick={props.onEditAvatar} />
        </div>
        <div className='profile__info'>
          <div className='profile__heading'>
            <h1 className='profile__title'>{traverseUserContext.name}</h1>
            <button type='button' className='profile__edit-button' onClick={props.onEditProfile} />
          </div>
          <p className='profile__subtitle'>{traverseUserContext.about}</p>
        </div>
        <button type='button' className='profile__add-button' onClick={props.onAddPlace} />
      </section>
      <section className='elements'>
        {cards.map((item) => {
          return (
            <Card
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          )
        })}
      </section>
    </main>
  )
}
export default Main
