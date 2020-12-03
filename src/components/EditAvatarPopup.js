import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef();
  const submitButtonText = isLoading ? "Сохранение..." : "Сохранить";

  // Сброс полей ввода:
  //***************************************************************************
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);
  //***************************************************************************

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      buttonTitle={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        className="popup__input popup__input_type_info popup__input_type_link"
        id="link-input"
        ref={avatarRef}
        required
      />
      <span id="link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
