import React from 'react';
import icon_ok from '../vendor/images/popup_icon_ok.svg';
import icon_fail from '../vendor/images/popup_icon_fail.svg';

function InfoTooltip(props) {
  const { name, isSignIn, isOpen, onClose } = props;
  const icon = isSignIn ? icon_ok : icon_fail;
  const message = isSignIn
    ? 'Вы успешно зарегистрировались!'
    : 'Что-то пошло не так! Попробуйте ещё раз.';

  return (
    <section
      className={`pop-up ${isOpen ? 'pop-up__open' : ''} pop-up_type_${name} `}
    >
      <div className="pop-up__container pop-up__container-tooltip">
        <button
          className="pop-up__close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          className="pop-up__tooltip-img"
          src={icon}
          alt="Что то пошло не так"
        />
        <h2 className="pop-up__title">{message}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
