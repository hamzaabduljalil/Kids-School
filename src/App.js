import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import ChooseCard from "./components/Card/ChooseCard/ChooseCard";
import Number from "./Pages/Number";
import Letters from "./Pages/Letters";
import DisplayNumberPage from "./components/Card/Number/DisplayNumberPage";
import DisplayLettersPage from "./components/Card/Letter/DisplayLettersPage";
import QuizNumber from "./components/Quiz/QuizNumber";
import QuizLetter from "./components/Quiz/QuizLetter";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import ForgetPassword from "./components/Login/ForgetPassword";
import ProtectedRoutes from "./components/Login/ProtectedRoutes";
import ChangePassword from "./components/Login/ChangePassword";
import QrComponent from "./components/Login/QrComponent";
import Video from "./Pages/Video";
import DisplayVideoPage from "./components/Card/Video/DisplayVideoPage";
import Animals from "./Pages/Animals";
import DisplayAnimalPage from "./components/Card/Animals/DisplayAnimalPage";
import QuizAnimals from "./components/Quiz/QuizAnimals";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="ForgetPassword" element={<ForgetPassword />} />
        <Route path="QrComponent" element={<QrComponent />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="Home" element={<Home />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="chooseCard" element={<ChooseCard />} />
          <Route path="Letters" element={<Letters />} />
          <Route path="Number" element={<Number />} />
          <Route path="Animals" element={<Animals />} />
          <Route path="number/:number" element={<DisplayNumberPage />} />
          <Route path="letter/:letter" element={<DisplayLettersPage />} />
          <Route path="animal/:animal" element={<DisplayAnimalPage />} />
          <Route path="number/:number/quiz" element={<QuizNumber />} />
          <Route path="letter/:letter/quiz" element={<QuizLetter />} />
          <Route path="animal/:animal/quiz" element={<QuizAnimals />} />
          <Route path="video" element={<Video />} />
          <Route path="video/:Path" element={<DisplayVideoPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
