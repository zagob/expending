import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ClassObject {
  name: string;
  title: string;
}

interface SignInClassContextProps {
  classObject: ClassObject;
  onSaveClass: (date: ClassObject) => void;
}

export const SignInClassContext = createContext({} as SignInClassContextProps);

interface SignInClassProviderProps {
  children: ReactNode;
}

export function SignInClassProvider({ children }: SignInClassProviderProps) {
  const [classObject, setClassObject] = useState({} as ClassObject);
  const route = useRouter();

  function onSaveClass(date: ClassObject) {
    setClassObject(date);
    route.push(`/dash/${date.name}`);
  }

  //   useEffect(() => {
  //     if (classObject) {
  //       console.log("d");
  //       route.push("/dashboard");
  //     }
  //     console.log("home");
  //     route.push("/");
  //   }, [classObject]);

  return (
    <SignInClassContext.Provider value={{ onSaveClass, classObject }}>
      {children}
    </SignInClassContext.Provider>
  );
}
