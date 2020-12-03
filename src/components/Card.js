import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  _id,
  link,
  name,
  likes,
  owner,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const card = {
    _id: _id,
    link: link,
    name: name,
    owner: owner,
    likes: likes,
  };

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `photo-grid__btn photo-grid__btn_action_del ${
    isOwn ? "" : "photo-grid__btn photo-grid__btn_action_del_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `photo-grid__btn photo-grid__btn_action_like ${
    isLiked ? "photo-grid__btn photo-grid__btn_clicked" : ""
  }`;

  function handleClick() {
    onCardClick({
      link: link,
      name: name,
    });
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="photo-grid__card">
      <img
        src={link}
        alt={name}
        className="photo-grid__image"
        onClick={handleClick}
      />
      <div className="photo-grid__description">
        <h2 className="photo-grid__title">{name}</h2>
        <div className="photo-grid__btn_action_likes">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            title="Поставить лайк"
          ></button>
          <p className="photo-grid__like-amount">{likes.length}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
        title="Удалить"
      ></button>
    </li>
  );
}

export default Card;
