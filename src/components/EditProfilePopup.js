import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
  const submitButtonText = isLoading ? "Сохранение..." : "Сохранить";

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      buttonTitle={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="text"
        placeholder="Имя"
        maxLength="40"
        minLength="2"
        className="popup__input popup__input_type_name"
        id="name"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span id="name-error"></span>
      <input
        name="description"
        type="text"
        placeholder="Занятие"
        autoComplete="off"
        maxLength="200"
        minLength="2"
        className="popup__input popup__input_type_info"
        id="info"
        value={description || ""}
        onChange={handleDescriptionChange}
        required
      />
      <span id="info-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
