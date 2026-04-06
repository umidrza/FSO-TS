import type { CoursePart } from "../types.ts";
import Part from "./Part.tsx";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <div key={index}>
          <Part part={part} />
        </div>  
      ))}
    </div>
  );
}

export default Content;