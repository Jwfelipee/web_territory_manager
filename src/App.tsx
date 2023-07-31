import { AppProvider } from "./providers/app";
import { AppRoutes } from "./routes";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <AppProvider>
      <RecoilRoot>
        <AppRoutes />
      </RecoilRoot>
    </AppProvider>
  );
}

export default App;
