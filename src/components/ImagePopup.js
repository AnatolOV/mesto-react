import React from "react";

function ImagePopup({ card, onClose }) {
    return (
      <section
        className={`pop-up ${ card ? 'pop-up__open' : ''} pop-up_type_image`}
        onClick={onClose}
      >
        <div
          className="pop-up__container pop-up__container-photo"
          onClick={(evt) => evt.stopPropagation()}
        >
          <button
            className="pop-up__close"
            type="button"
            onClick={onClose}
          ></button>
          <img
            className="pop-up__image"
            src={card ? card.link : ''}
            alt={card ? card.name : ''}
          />
          <p className="pop-up__name-image">{card ? card.name : ''}</p>
        </div>
      </section>
    );
}

export default ImagePopup;

