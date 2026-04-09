import type { Diary } from "../types";

const Diaries = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
      <h1>Flight Diaries</h1>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <p>Date: {diary.date}</p>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
            {diary.comment && <p>Comment: {diary.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Diaries;
