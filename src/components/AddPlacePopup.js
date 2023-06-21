import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onSubmit, isOpen, onClose }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  // input change
  function handleNameChange(e) {
    setName(e.target.value);
  }
  // input change
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      name: name,
      link: link,
    });
  }
  // clean inputs
  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        required
        minLength="2"
        maxLength="30"
        name="name"
        id="email-input"
        placeholder="Название"
        className="pop-up__field pop-up__field_name_place"
        onChange={handleNameChange}
        value={name}
      />
      <span className="pop-up__input-error pop-up__input-error-first email-input-error"></span>
      <input
        type="url"
        required
        name="link"
        id="reference-input"
        placeholder="Ссылка на картинку"
        className="pop-up__field pop-up__field_reference_image"
        onChange={handleLinkChange}
        value={link}
      />
      <span className="pop-up__input-error pop-up__input-error-second reference-input-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
