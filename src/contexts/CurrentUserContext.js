import React from 'react';

export const CurrentUserContext = React.createContext();

export const defaultCurrentUser = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь океана',
};