function ImagePopup() {
  return (
    <section className='popup popup_fullscreen'>
      <figure className='fullscreen'>
        <button type='button' className='popup__close-button' />
        <img src='#' alt='#' className='fullscreen__image' />
        <figcaption className='fullscreen__text' />
      </figure>
    </section>
  )
}
export default ImagePopup
