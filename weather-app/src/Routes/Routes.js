import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "../Templates/Header/Header";
import Main from "../Components/Main/main";

export default function RoutingComponent() {
  return (
    <BrowserRouter>
        <Header className="container-main"></Header>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main" element={<Main />} />
        </Routes>
    </BrowserRouter>
  );
}