import { Button } from "@/components/ui";
import { ISetSearch } from "../type";
import { Search } from "react-feather";
import clsx from "clsx";

export const SearchButton = ({ setSearch }: { setSearch: ISetSearch }) => {
  return (
    <Button
      onClick={() => setSearch((prev) => ({ ...prev, show: !prev.show }))}
      className={clsx("fixed bottom-4 left-4 !w-10 !h-10 !p-2 !rounded-full")}
    >
      <Search size={16} />
    </Button>
  );
};
