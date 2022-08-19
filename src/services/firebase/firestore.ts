import { doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";

import { app } from "./initialize";

const db = getFirestore(app);

interface CreateClassProps {
  name: string;
  title: string;
}

export async function createClass(data: CreateClassProps) {
  if (data.name === "class") {
    return alert("Nome da sala inválido");
  }

  const docRef = doc(db, "class", data.name);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { error: "sala existente já criada" };
  }

  await setDoc(doc(db, "class", data.name), data);
  return { success: "sala criada com sucesso" };
}

export async function getClassExist(name: string) {
  const docRef = doc(db, "class", name);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }

  return docSnap.data();
}
