import { useState, useEffect } from 'react'
import { api } from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setСards] = useState([])

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

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

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
  const handleAddPlaceSubmit = (data) => {
    api
      .postCard(data.name, data.link)
      .then((newCard) => {
        setСards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
    setSelectedCard({name: '', link: ''})
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
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
        <AddPlacePopup
          onUpdateGalery={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
