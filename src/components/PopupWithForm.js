import React from "react";

function PopupWithForm({
  name,
  title,
  buttonTitle,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_content_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__btn_action_close"
          onClick={onClose}
        ></button>
        <h3 className="popup__heading">{title}</h3>
        <form
          action="#"
          name="popup-form"
          className={`popup__form popup-${name}__form`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button type="submit" className="popup__btn">
            {buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
