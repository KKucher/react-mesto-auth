import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import * as authApi from "../utils/authApi";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import PopupIsClose from "./PopupIsClose";

import successLogo from "../images/Success.svg";
import failLogo from "../images/Error.svg";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectefRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState({});

  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const [dataInfoTool, setDataInfoTool] = React.useState({
    title: "",
    icon: "",
  });

  // Обработчики событий:
  //***************************************************************************
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      title: card.name,
    });
  }

  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(true);
    setCardDelete(card);
  }

  // Обработчик событий (авторизация):
  //***************************************************************************
  function handleLogin(email, password) {
    console.log(email, password);
    authApi
      .authorize(email, password)
      .then((data) => {
        authApi
          .getContent(data.token)
          .then((res) => {
            setUserData(res.data.email);
          })
          .catch((err) => {
            setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: failLogo });
            console.error(err);
            handleInfoTooltipOpen();
          });

        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: failLogo });
        console.error(err);
        handleInfoTooltipOpen();
      });
  }

  // Обработчик событий (регистрация):
  //***************************************************************************
  function handleRegister(email, password) {
    authApi
      .register(email, password)
      .then((data) => {
        history.push("/sign-in");
        console.log(data);
        setDataInfoTool({ title: "Вы успешно зарегистрировались!", icon: successLogo });
        handleInfoTooltipOpen();
      })
      .catch((err) => {
        console.error(err);
        setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: failLogo });
        handleInfoTooltipOpen();
      });
  }

  // Проверка токена:
  //***************************************************************************
  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      authApi
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserData(res.data.email);
            history.push("/");
          } else {
            setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: failLogo });
            handleInfoTooltipOpen();
          }
        })
        .catch((err) => console.log(err));
    }
  } 

  React.useEffect(() => {
    tokenCheck();
  }, []); 

  // Закрытие попапов:
  //***************************************************************************
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setLoading(false);
    setDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  // Изменение данных пользователя:
  //***************************************************************************
  function handleUpdateUser({ name, about }) {
    setLoading(true);
    api
      .editProfile({ name, about })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  // Изменение аватара:
  //***************************************************************************
  function handleUpdateAvatar({ avatar }) {
    setLoading(true);
    api
      .editAvatar({ avatar })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  // Поставить/удалить лайк:
  //***************************************************************************
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeDislikeStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  // Удалить карточку:
  //***************************************************************************
  function handleCardDelete(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  // Добавить карточки:
  //***************************************************************************
  function handleAddPlaceSubmit({ name, link }) {
    setLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  // Разлогиниться:
  //***************************************************************************
  function signOut() {
    setLoggedIn(false);
    setUserData("");
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  // Загрузка карточек и информации о пользователе с сервера:
  //***************************************************************************
  React.useEffect(() => {
    const promises = [api.getUserInfo(), api.getInitialCards()];

    Promise.all(promises)
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(`Error ${err}`));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header headerMail={userData} signOut={signOut} />
        <Switch>
          <ProtectedRoute
            exact 
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          />

          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        {loggedIn && <Footer/>}

        {/* Profile popup */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        {/* Add new card popup */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        {/* Avatar popup */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        {/* Img confirm popup */}
        <DeleteCardPopup
          card={cardDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
        
        {/* Tooltip popup */}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={dataInfoTool.title}
          icon={dataInfoTool.icon}
        />

        {/* Img wiev popup */}
        <PopupIsClose>
          <ImagePopup
            card={selectedCard}
            isOpen={selectedCard.isOpen}
            onClose={closeAllPopups}
          />
        </PopupIsClose>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
