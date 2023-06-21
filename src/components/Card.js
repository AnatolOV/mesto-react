import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
 

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  // const cardRecycleBinClassName = {isOwn && <button className="elements__bin_active" onClick={handleCardDelete} />}
  const cardRecycleBinClassName = (`elements__bin ${isOwn ? 'elements__bin_active' : ''}`);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = ( `elements__like ${isLiked && 'elements__like_active'}`);

  function handleCardDelete() {
    onCardDelete(card);
    // console.log(1)
  }
   function handleCardLike() {
     onCardLike(card);
   }

  return (
    <div className="elements__element">
      <button
        className={cardRecycleBinClassName}
        type="button"
        onClick={handleCardDelete}
      ></button>
      <img
        src={card.link}
        alt="фото места"
        className="elements__image"
        onClick={() => {
          onCardClick(card);
        }}
      />
      <div className="elements__container">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__containerfornumber">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleCardLike}
          ></button>
          <span className="elements__likequantity">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
