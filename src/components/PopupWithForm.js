function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name}`}>
      <form name={props.name} className='popup__container' noValidate>
        <h2 className='popup__title'>{props.title}</h2>
        {children}
        <button type='submit' className='popup__sumbit-button' />
        <button type='button' className='popup__close-button' />
      </form>
    </section>
  )
}
export default PopupWithForm