function Main() {
  const handleEditAvatarClick = () => {
    document.querySelector('.avatar-popup').classList.add('popup_is-opened')
  }
  const handleEditProfileClick = () => {
    document.querySelector('.profile-popup').classList.add('popup_is-opened')
  }
  const handleAddPlaceClick = () => {
    document.querySelector('.add-popup').classList.add('popup_is-opened')
  }

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar-section'>
          <img src='#' alt='Аватар профиля' className='profile__avatar' />
          <button
            type='button'
            className='profile__avatar-button'
            onClick={handleEditAvatarClick}
          />
        </div>
        <div className='profile__info'>
          <div className='profile__heading'>
            <h1 className='profile__title' />
            <button
              type='button'
              className='profile__edit-button'
              onClick={handleEditProfileClick}
            />
          </div>
          <p className='profile__subtitle' />
        </div>
        <button type='button' className='profile__add-button' onClick={handleAddPlaceClick} />
      </section>
      <section className='elements' />
    </main>
  )
}
export default Main
