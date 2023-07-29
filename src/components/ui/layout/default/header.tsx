import clsx from "clsx";

export interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <>
      <div
        className={clsx(
          "bg-primary flex w-full h-48 rounded-bl-[30%] relative items-center justify-center shadow-md drop-shadow-md px-10 z-10"
        )}
      >
        {children}
      </div>
    </>
  );
}
