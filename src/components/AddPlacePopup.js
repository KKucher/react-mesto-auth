import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const submitButtonText = isLoading ? "Сохранение..." : "Сохранить";

  // Сброс полей ввода:
  //***************************************************************************
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);
  //***************************************************************************

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name={"add"}
      title={"Новое место"}
      buttonTitle={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="text"
        placeholder="Название"
        maxLength="30"
        minLength="2"
        className="popup__input popup__input_type_name popup__input_type_title"
        id="title"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span id="title-error"></span>
      <input
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        className="popup__input popup__input_type_info popup__input_type_link"
        id="link"
        value={link || ""}
        onChange={handleLinkChange}
        required
      />
      <span id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
