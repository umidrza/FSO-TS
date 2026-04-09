import diaryService from "../services/diaries";
import type { Diary, Visibility, Weather } from "../types";
import { getErrorMessage } from "../util";

const NewDiary = ({
  setDiaries,
  setNotification,
}: {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const addDiary = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const diaryData = {
      date: formData.get("date") as string,
      weather: formData.get("weather") as Weather,
      visibility: formData.get("visibility") as Visibility,
      comment: formData.get("comment") as string,
    };

    try {
      const newDiary = await diaryService.addDiary(diaryData);
      setDiaries((prevDiaries) => [...prevDiaries, newDiary]);
      setNotification("Diary added successfully!");
    } catch (e: unknown) {
      setNotification(getErrorMessage(e));
    }
  };

  return (
    <div>
      <h1>New Diary</h1>
      <form onSubmit={addDiary}>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" />
        </div>
        <div>
          <label>Weather</label>
          <div>
            <label>
              <input type="radio" name="weather" value="sunny" />
              Sunny
            </label>
            <label>
              <input type="radio" name="weather" value="rainy" />
              Rainy
            </label>
            <label>
              <input type="radio" name="weather" value="cloudy" />
              Cloudy
            </label>
            <label>
              <input type="radio" name="weather" value="stormy" />
              Stormy
            </label>
            <label>
              <input type="radio" name="weather" value="windy" />
              Windy
            </label>
          </div>
        </div>

        <div>
          <label>Visibility</label>
          <div>
            <label>
              <input type="radio" name="visibility" value="good" />
              Good
            </label>
            <label>
              <input type="radio" name="visibility" value="poor" />
              Poor
            </label>
            <label>
              <input type="radio" name="visibility" value="ok" />
              OK
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input type="text" id="comment" name="comment" />
        </div>
        <button type="submit">Add Diary</button>
      </form>
    </div>
  );
};

export default NewDiary;
