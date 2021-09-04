import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import { useState } from 'react'
function App() {
  // переменные состояния, отвечающие за видимость трёх попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
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

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
  }

  return (
    <div className='page'>
      <Header />
      <Main
        // props
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />

      <PopupWithForm
        // попап измен. профиля

        // props
        popupClass='profile-popup'
        formName='formProfile'
        title='Редактировать профиль'
        submitButtonText='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        {/* children */}
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
        // попап доб. карточки

        // props
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
        // попап измен. аватара

        // props
        popupClass='avatar-popup'
        formName='formAvatar'
        title='Обновить аватар'
        submitButtonText='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        {/* children */}
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
      {/* <section className='popup avatar-popup'>
        <form name='formAvatar' className='popup__container' noValidate>
          <h2 className='popup__title'>Обновить аватар</h2>
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
          <button type='submit' className='popup__sumbit-button'>
            Сохранить
          </button>
          <button type='button' className='popup__close-button' />
        </form>
      </section>
      <section className='popup popup-delete'>
        <div className='popup__container'>
          <h2 className='popup__title'>Вы уверены?</h2>
          <button type='button' className='popup__close-button' />
          <button type='button' className='popup__sumbit-button'>
            Да
          </button>
        </div>
      </section>

      
      <section className='popup popup_fullscreen'>
        <figure className='fullscreen'>
          <button type='button' className='popup__close-button' />
          <img src='#' alt='#' className='fullscreen__image' />
          <figcaption className='fullscreen__text' />
        </figure>
      </section> */}
      {/* <template class='template'>
        <article class='element'>
          <button type='button' class='element__trash-button'></button>
          <img src='#' alt='#' class='element__image' />
          <div class='element__discription'>
            <h2 class='element__title'></h2>
            <div class='element__like-section'>
              <button type='button' class='element__like-button'></button>
              <span class='element__like-counter'></span>
            </div>
          </div>
        </article>
      </template> */}
    </div>
  )
}

export default App
