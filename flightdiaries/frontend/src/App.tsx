import diaryService from "./services/diaries";
import { useEffect, useState } from "react";
import type { Diary } from "./types";
import Diaries from "./components/Diaries";
import NewDiary from "./components/NewDiary";
import Notification from "./components/Notification";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getDiaries();
      setDiaries(diaries);
    };
    fetchDiaries();
  }, []);

  return (
    <div className="App">
      <Notification message={notification} />
      <NewDiary setDiaries={setDiaries} setNotification={setNotification} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
