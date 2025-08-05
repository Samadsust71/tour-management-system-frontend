import { Outlet } from "react-router";
import RootLayout from "./components/layout/RootLayout";

function App() {
  return (
    <RootLayout>
      <Outlet/>
    </RootLayout>
  );
}

export default App;
