import React, { createContext, useEffect, useState } from 'react'

interface UserAuth {
    id: string;
    nick: string;
    email: string;
    token: string;
    refreshToken: string;
    tokenExp: number;
  }

const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

const [userAuth, setUserAuth] = useState<UserAuth>({
    id: '',
    nick: '',
    email: '',
    token: '',
    refreshToken: '',
    tokenExp: -1,
  });

  // Decode the token when retrieving it from localStorage
  useEffect(() => {
    const storedUserAuth = localStorage.getItem('userAuth');
    if (storedUserAuth) {
      const parsedAuth = JSON.parse(storedUserAuth);

      const decodedAuth = {
        ...parsedAuth,
        token: atob(parsedAuth.token),
        refreshToken: atob(parsedAuth.refreshToken),
      };

      setUserAuth(decodedAuth);
    }
  }, []);

  // Encode the token before storing it in localStorage
  useEffect(() => {
    if (userAuth.token) {
      const encodedAuth = {
        ...userAuth,
        token: btoa(userAuth.token),
        refreshToken: btoa(userAuth.refreshToken),
      };

      localStorage.setItem('userAuth', JSON.stringify(encodedAuth));
    }
  }, [userAuth]);

  return (
    <UserAuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserAuthContext.Provider>
  )
}

const UserAuthContext = createContext<{
  userAuth: UserAuth;
  setUserAuth: React.Dispatch<React.SetStateAction<UserAuth>>;
} | undefined>(undefined);

export { UserAuthProvider, UserAuthContext };
