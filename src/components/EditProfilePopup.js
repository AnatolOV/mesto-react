import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({
  onUpdateAvatar,
  closeAllPopups,
  isOpen,
  onClose,
  isRenderLoading,
  renderLoading,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about } = currentUser;
  const [profileName, setpProfileName] = React.useState('');
  const [profileAbout, setProfileAbout] = React.useState('');
  // input change
  function handleNameChange(evt) {
    setpProfileName(evt.target.value);
  }
  // input change
  function handleDescriptionChange(evt) {
    setProfileAbout(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      name: profileName,
      about: profileAbout,
    });
  }
  // всталяем значение в инпуты
  React.useEffect(() => {
    if (isOpen) {
      setpProfileName(name);
      setProfileAbout(about);
    }
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
      name={'edit'}
      onSubmit={handleSubmit}
      isRenderLoading={isRenderLoading}
      renderLoadingButtonText={'Сохранение...'}
    >
      <input
        type="text"
        required
        minLength="2"
        maxLength="40"
        name="human"
        id="human-input"
        placeholder="ФИО"
        value={profileName}
        className="pop-up__field pop-up__field_name_human"
        onChange={handleNameChange}
      />
      <span className="pop-up__input-error pop-up__input-error-first human-input-error"></span>
      <input
        type="text"
        required
        minLength="2"
        maxLength="200"
        name="occupation"
        id="occupation-input"
        placeholder="Вид деятельности"
        className="pop-up__field pop-up__field_name_occupation"
        value={profileAbout}
        onChange={handleDescriptionChange}
      />
      <span className="pop-up__input-error pop-up__input-error-second occupation-input-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;