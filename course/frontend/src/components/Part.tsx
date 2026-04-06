import type { CoursePart } from "../types";
import { assertNever } from "../util";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {part.name} - {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>
            {part.name} - {part.exerciseCount}
          </h3>
          <p>Project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {part.name} - {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {part.name} - {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>Required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
