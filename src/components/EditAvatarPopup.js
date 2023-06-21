import React from "react";
import PopupWithForm from "./PopupWithForm";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isRenderLoading,
  renderLoading
}) {
  const ref = React.useRef();
  // const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: ref.current.value });
  }
  // clean inputs
  React.useEffect(() => {
    ref.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
      name={'avatar'}
      onSubmit={handleSubmit}
      isRenderLoading={isRenderLoading}
      renderLoadingButtonText={"Обновление..."}
    >
      <input
        ref={ref}
        type="url"
        required
        name="avatarPhoto"
        id="reference-input-photo"
        placeholder="Ссылка на фото"
        className="pop-up__field pop-up__field_reference_image"
      />
      <span className="pop-up__input-error pop-up__input-error-avatar reference-input-photo-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
