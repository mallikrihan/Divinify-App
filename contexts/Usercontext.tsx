// import React, { createContext, useContext, useState } from "react";

// type UserData = {
//   id?: string;
//   name?: string;
//   phone?: string;
//   email?: string;
// };
// type UserContextType = {
//   user: UserData | null;
//   setUser: (data: UserData) => void;
// };

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUserState] = useState<UserData | null>(null);

//   const setUser = (data: UserData) => {
//     setUserState(data);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within UserProvider");
//   }
//   return context;
// };
// import React, { createContext, useContext, useState } from "react";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   religion?: string;
//   profileComplete?: boolean;
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   updateUser: (data: Partial<User>) => void;
//   isLoading: boolean;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>({
//     id: "1",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "+1234567890",
//     religion: "islam",
//     profileComplete: false,
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const updateUser = (data: Partial<User>) => {
//     setUser((prev) => (prev ? { ...prev, ...data } : null));
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, updateUser, isLoading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within UserProvider");
//   }
//   return context;
// };
import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string; // Add this line
  religion?: string;
  profileComplete?: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "", // Add this with empty default
    religion: "islam",
    profileComplete: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
