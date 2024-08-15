import React, { createContext, useState } from 'react'

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
