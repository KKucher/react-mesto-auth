import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        />
        <div className="profile__description">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__btn profile__btn_action_edit"
            title="Редактировать профиль"
            onClick={onEditProfile}
          />
          <p className="profile__work">{currentUser.about}</p>
        </div>
        <button
          className="profile__btn profile__btn_action_add"
          title="Добавить фотографию"
          onClick={onAddPlace}
        />
      </section>

      <section className="photo-grid">
        <ul className="photo-grid__list">
          {cards.map((props) => (
            <Card
              key={props._id}
              _id={props._id}
              owner={props.owner}
              link={props.link}
              name={props.name}
              likes={props.likes}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
