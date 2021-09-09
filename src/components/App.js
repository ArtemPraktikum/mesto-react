import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import { useState, useEffect } from 'react'
import ImagePopup from './ImagePopup.js'
import { api } from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
function App() {
  // переменные состояния, отвечающие за видимость
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(false)

  //Юзер инфо
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    // Данные необходимые при загрузке страницы
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userArray, cardsArray]) => {
        setCurrentUser(userArray)

        // setСards(cardsArray)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  // функции отвечающие за изменение стейта
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleCardClick = (name, link) => {
    setSelectedCard({
      name: name,
      link: link,
    })
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          popupClass='profile-popup'
          formName='formProfile'
          title='Редактировать профиль'
          submitButtonText='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className='popup__input'>
            <label className='popup__field'>
              <input
                type='text'
                className='popup__item'
                id='name'
                name='nameInFormProfile'
                defaultValue={''}
                placeholder='Имя'
                required
                minLength={2}
                maxLength={40}
              />
              <span className='popup__item-error name-error' />
            </label>
            <label className='popup__field'>
              <input
                type='text'
                className='popup__item'
                id='aboutMe'
                name='aboutMeInFormProfile'
                defaultValue={''}
                placeholder='Обо мне'
                required
                minLength={2}
                maxLength={200}
              />
              <span className='popup__item-error aboutMe-error' />
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          popupClass='add-popup'
          formName='formAddCard'
          title='Новое место'
          submitButtonText='Создать'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          {/* children */}
          <fieldset className='popup__input'>
            <label className='popup__field'>
              <input
                type='text'
                className='popup__item'
                id='placeName'
                name='nameInFormAddCard'
                defaultValue={''}
                placeholder='Название'
                required
                minLength={2}
                maxLength={30}
              />
              <span className='popup__item-error placeName-error' />
            </label>
            <label className='popup__field'>
              <input
                type='url'
                className='popup__item'
                id='link'
                name='aboutMeInFormAddCard'
                defaultValue={''}
                placeholder='Ссылка на картинку'
                required
              />
              <span className='popup__item-error link-error' />
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          popupClass='avatar-popup'
          formName='formAvatar'
          title='Обновить аватар'
          submitButtonText='Сохранить'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className='popup__input'>
            <label className='popup__field'>
              <input
                type='url'
                className='popup__item'
                id='linkAvatar'
                name='avatarInformAvatar'
                defaultValue={''}
                placeholder='Ссылка на аватар'
                required
              />
              <span className='popup__item-error linkAvatar-error' />
            </label>
          </fieldset>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
