import clsx from "clsx";

interface BodyProps {
  children: React.ReactNode;
}

export function Body({ children }: BodyProps) {
  return (
    <>
      <div className={clsx("h-[calc(100vh-192px)] p-2 flex flex-col")}>
        {children}
      </div>
    </>
  );
}
