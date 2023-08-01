import { AppProvider } from "./providers/app";
import { AppRoutes } from "./routes";
import { RecoilRoot, useRecoilValue } from "recoil";
import { loadState } from "./states/load";
import { BookLoader, ScienceLoader, SpiralLoader } from "./components/ui";
import clsx from "clsx";

function App() {
  return (
    <AppProvider>
      <RecoilRoot>
        <AppWithLoader />
      </RecoilRoot>
    </AppProvider>
  );
}

export default App;

const AppWithLoader = () => {
  const { message, loader } = useRecoilValue(loadState);
  const Component = loaders[loader];
  const showLoader = loaders[loader] && message;

  return (
    <>
      {showLoader && (
        <>
          <Component message={message} />
          <Overlay />
        </>
      )}
      <div
        className={clsx({
          "fixed inset-0 blur-[1px] z-30": showLoader,
        })}
      >
        <AppRoutes />
      </div>
    </>
  );
};

const loaders = {
  science: ScienceLoader,
  book: BookLoader,
  spiral: SpiralLoader,
};

const Overlay = () => {
  return (
    <div className="fixed inset-0 bg-black opacity-50 brightness-90 z-40"></div>
  );
};
