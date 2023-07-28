import { Body, Button, Header } from "@/components/ui";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigator = useNavigate();
  return (
    <div className={clsx("relative")}>
      <Header>
        <h1 className="text-2xl font-semibold">Olá admin</h1>
      </Header>
      <Body>
        <Button onClick={() => navigator(-1)}>Voltar</Button>
      </Body>
    </div>
  );
}
