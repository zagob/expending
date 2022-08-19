import { useRouter } from "next/router";

export default function Dashb() {
  const route = useRouter();

  const { name } = route.query;

  console.log("name", name);
  return <h1>Dash</h1>;
}
