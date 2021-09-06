function Card(props) {
  function handleClick() {
    props.onCardClick(props.name, props.link)
  }

  return (
    <article className='element'>
      <button type='button' className='element__trash-button element__trash-button_visible' />
      <img src={props.link} alt={props.name} className='element__image' onClick={handleClick} />
      <div className='element__discription'>
        <h2 className='element__title'>{props.name}</h2>
        <div className='element__like-section'>
          <button type='button' className='element__like-button' />
          <span className='element__like-counter'>{props.likeNumber}</span>
        </div>
      </div>
    </article>
  )
}
export default Card
