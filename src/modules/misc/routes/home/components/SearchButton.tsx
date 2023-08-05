import { Button } from "@/components/ui";
import { Search } from "react-feather";
import clsx from "clsx";

export const SearchButton = () => {
  return (
    <Button.Root
      className={clsx(
        "fixed bottom-6 -translate-x-1/2 left-1/2 !w-12 !h-12 !p-2 !rounded-full animate-pulse"
      )}
      variant="secondary"
    >
      <Search size={16} />
    </Button.Root>
  );
};
