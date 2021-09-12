import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
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
    // Данные юзера необходимые при загрузке страницы
    api
      .getUserInfo()
      .then((userArray) => {
        setCurrentUser(userArray)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data.name, data.about)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleUpdateAvatar = (avatar) => {
    api
      .updateAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
  const handleCardClick = (card) => {
    setSelectedCard({
      name: card.name,
      link: card.link,
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

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          popupClass='add-popup'
          formName='formAddCard'
          title='Новое место'
          submitButtonText='Создать'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
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

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
