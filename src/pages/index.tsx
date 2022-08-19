import type { NextPage } from "next";
import Link from "next/link";
import { ChangeEvent, useContext, useState } from "react";
import { SignInClassContext } from "../contexts/SignInClassProvider";
import { api } from "../services/api";
import { createClass, getClassExist } from "../services/firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const Home: NextPage = () => {
  const { onSaveClass } = useContext(SignInClassContext);
  const [nameClass, setNameClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleOnClick(event: ChangeEvent) {
    event.preventDefault();

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      alert("Select file");
      return;
    }

    setIsLoading(true);

    const file = input.files[0];
    console.log("file", file);

    const formData = new FormData();

    formData.append("file", file);

    console.log(formData);
    const response = await api.post("/class/upload", formData);
    console.log("res", response);
    // Object.values(inputFileRed.current.files).forEach((file) => {
    //   formData.append("file", file);
    // });
  }

  async function handleEntryClass() {
    const response = await getClassExist(nameClass);

    if (!response) {
      return toast.error("nenhuma sala encontrada");
    }
    const { name, title } = response;

    onSaveClass({ name, title });
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <Toaster />
      <div className="absolute top-10 right-10 border border-gray-600 px-4 py-1 text-md transition-all hover:border-gray-400">
        <Link href="/createClass">
          <a>Criar uma Sala</a>
        </Link>
      </div>
      <div className="bg-gray-900 rounded-md p-28 flex flex-col gap-4 shadow-lg">
        <input
          onChange={(e) => setNameClass(e.target.value)}
          value={nameClass}
          className="bg-transparent border border-gray-500 p-2 placeholder:text-sm placeholder:text-gray-500"
          type="text"
          placeholder="Digite o nome da sala"
        />
        <button
          className="bg-blue-500 py-2 rounded-md text-lg font-bold disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-blue-500 transition-all hover:bg-blue-600"
          type="button"
          onClick={handleEntryClass}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Home;
