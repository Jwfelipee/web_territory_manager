import clsx from "clsx";

export function Body({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div
        className={clsx("h-[calc(100vh-192px)] flex flex-col", className)}
        {...rest}
      >
        {children}
      </div>
    </>
  );
}
