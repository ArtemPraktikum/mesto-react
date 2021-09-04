function Main(props) {


  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar-section'>
          <img src='#' alt='Аватар профиля' className='profile__avatar' />
          <button
            type='button'
            className='profile__avatar-button'
            onClick={props.onEditAvatar}
          />
        </div>
        <div className='profile__info'>
          <div className='profile__heading'>
            <h1 className='profile__title' />
            <button
              type='button'
              className='profile__edit-button'
              onClick={props.onEditProfile}
            />
          </div>
          <p className='profile__subtitle' />
        </div>
        <button type='button' className='profile__add-button' onClick={props.onAddPlace} />
      </section>
      <section className='elements' />
    </main>
  )
}
export default Main
