import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/Api';
import { useState } from 'react';
import {
  CurrentUserContext,
  defaultCurrentUser,
} from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as apiAuth from '../utils/apiAuth';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

function App() {
  // const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const navigate = useNavigate();
  /* Переменная состояния карточек */
  const [cards, setCards] = React.useState([]);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  /* Переменная состояния пользователя */
  const [currentUser, setCurrentUser] = React.useState({});
  // попап редактирования
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isRenderLoading, setIsRenderLoading] = useState(false);
  //////////////////
  React.useEffect(() => {
    checkToken();
  }, []);

  function logOut() {
    setLoggedIn(false);
    setCurrentUser(defaultCurrentUser);
    localStorage.removeItem('jwt');
  }

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser({ ...currentUser, ...user });
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
          openInfoTooltipPopup(false);
        });
    }
  }, [loggedIn]);

  function openInfoTooltipPopup(isSignIn) {
    setIsInfoTooltipPopup(true);
    setIsSignIn(isSignIn);
  }

  function handleLogin(loginData) {
    apiAuth
      .login(loginData)
      .then((res) => {
        if (res && res.token) {
          setCurrentUser({ ...currentUser, email: loginData.email });
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      });
  }

  function handleRegister(regData) {
    apiAuth
      .register(regData)
      .then((res) => {
        if (res && res.data) {
          openInfoTooltipPopup(true);
          navigate('/sign-in');
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      });
  }

  ////////////////////////

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function checkToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      apiAuth
        .checkToken(token)
        .then((res) => {
          if (res && res.data) {
            setLoggedIn(true);
            setCurrentUser({
              ...currentUser,
              email: res.data.email,
            });
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          openInfoTooltipPopup(false);
        });
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    /* Проверка есть ли уже лайк на этой карточке */
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .getLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((state) => state.filter((item) => item._id !== card._id))
      )
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      })
      .finally(() => renderLoading());
  }

  // update user
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((userDataServer) => {
        setCurrentUser({ ...currentUser, ...userDataServer });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // update avatar
  function handleUpdateAvatar(data) {
    api
      .patchAvatarInfo(data)
      .then((userDataServer) => {
        setCurrentUser({ ...currentUser, ...userDataServer });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      })
      .finally(() => renderLoading());
  }

  function renderLoading() {
    setIsRenderLoading((isRenderLoading) => !isRenderLoading);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopup(false);
  }

  // update cards
  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ImagePopup
        card={selectedCard}
        onClose={() => {
          setSelectedCard(null);
        }}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleAddPlaceSubmit}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateUser}
        isRenderLoading={isRenderLoading}
        renderLoading={renderLoading}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isRenderLoading={isRenderLoading}
        renderLoading={renderLoading}
      />

      <InfoTooltip
        name="tooltip"
        isOpen={isInfoTooltipPopup}
        onClose={closeAllPopups}
        isSignIn={isSignIn}
      />

      <div className="page">
        <Header loggedIn={loggedIn} email={currentUser.email} logOut={logOut} />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onCardLike={handleCardLike}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route path="/*" element={<Login onLogin={handleLogin} />} />
        </Routes>

        <Footer loggedIn={loggedIn} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
