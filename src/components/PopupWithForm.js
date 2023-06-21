
import React from "react";

function PopupWithForm({ title, name, buttonText, children, isOpen, onClose, onSubmit, isRenderLoading,
        renderLoadingButtonText }) {
  return (
    <section
      className={`pop-up ${isOpen ? 'pop-up__open' : ''} pop-up_type_${name}`}
    >
      <div className="pop-up__container">
        <button
          className="pop-up__close"
          type="button"
          onClick={onClose}
        ></button>
        <form
          action="submit"
          className="pop-up__form"
          name="editprofile"
          onSubmit={onSubmit}
        >
          <h2 className="pop-up__name">{title}</h2>
          {children}
          <button className="pop-up__save pop-up__save-avatar" type="submit">
            {isRenderLoading ? renderLoadingButtonText : buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;

