import { memo } from "react";
import "./SkillCard.css";

interface Props {
  skills: string[];
}

function SkillCard({ skills }: Props) {
  return (
    <div className="skill-card">
      <h2>Skills</h2>

      <div className="skills">
        {skills.map((skill, index) => (
          <span key={index}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

export default memo(SkillCard);