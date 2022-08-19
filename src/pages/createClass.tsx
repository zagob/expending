import { createClass } from "../services/firebase/firestore";
import { ArrowBendUpLeft } from "phosphor-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateClass() {
  const [nameClass, setNameClass] = useState("");
  const [titleClass, setTitleClass] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmitCreateClass(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (nameClass === "" || titleClass === "") {
      return toast.error("Preencha todos os campos");
    }

    const data = {
      name: nameClass,
      title: titleClass,
    };

    const response = await createClass(data);

    if (response) {
      setIsLoading(false);
    }
    if (response?.error) {
      return toast.error("sala existente já criada");
    }

    setNameClass("");
    setTitleClass("");

    console.log(response);
    toast.success("sala criada com sucesso!");
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Toaster />
      <form
        onSubmit={handleSubmitCreateClass}
        className="bg-gray-900 rounded-md p-28 flex flex-col gap-4 shadow-lg relative"
      >
        <div className="absolute left-10 top-10 transition-all hover:opacity-60">
          <Link href="/">
            <a>
              <ArrowBendUpLeft size={22} />
            </a>
          </Link>
        </div>
        <input
          onChange={(e) => setNameClass(e.target.value)}
          value={nameClass}
          className="bg-transparent border border-gray-500 p-2 placeholder:text-sm placeholder:text-gray-500"
          type="text"
          placeholder="Nome da sala"
        />
        <input
          onChange={(e) => setTitleClass(e.target.value)}
          value={titleClass}
          className="bg-transparent border border-gray-500 p-2 placeholder:text-sm placeholder:text-gray-500"
          type="text"
          placeholder="titulo"
        />
        <button
          className="bg-blue-500 py-2 flex justify-center rounded-md text-lg font-bold disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-blue-500 transition-all hover:bg-blue-600"
          type="submit"
          disabled={isLoading}
        >
          Criar sala
        </button>
        <div className="flex items-center gap-2 absolute bottom-20">
          {isLoading && (
            <>
              <span className="border-2 w-4 h-4 animate-spin border-l-emerald-300 rounded-full block"></span>
              <span>Criando sala...</span>
            </>
          )}
        </div>
      </form>
      {/* <input type="file" onChange={handleOnClick} /> */}
    </div>
  );
}
