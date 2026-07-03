"use client";

import { useState, useRef } from "react";

interface SkillTagInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  maxSkills?: number;
}

export function SkillTagInput({ skills, onChange, maxSkills = 15 }: SkillTagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (
      trimmed &&
      !skills.some((s) => s.toLowerCase() === trimmed.toLowerCase()) &&
      skills.length < maxSkills
    ) {
      onChange([...skills, trimmed]);
    }
    setInputValue("");
  };

  const removeSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && skills.length > 0) {
      removeSkill(skills.length - 1);
    }
  };

  return (
    <div
      className="w-full bg-transparent border-0 border-b border-[#cfc4c5] focus-within:border-black transition-colors cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex flex-wrap items-center gap-1.5 py-1.5">
        {skills.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#eef2ff] text-[#4338ca] rounded-full font-[Inter] text-[12px] font-medium"
          >
            {skill}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeSkill(index);
              }}
              className="w-3.5 h-3.5 flex items-center justify-center rounded-full hover:bg-[#c7d2fe] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[12px]">close</span>
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (inputValue.trim()) addSkill(inputValue);
          }}
          placeholder={skills.length === 0 ? "e.g. React, Python, Figma" : skills.length < maxSkills ? "Add more..." : ""}
          disabled={skills.length >= maxSkills}
          className="flex-1 min-w-[100px] bg-transparent border-none outline-none font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576]"
        />
      </div>
      {skills.length > 0 && (
        <p className="font-[Inter] text-[10px] text-[#848484] pb-1">
          {skills.length}/{maxSkills} skills · Press Enter or comma to add
        </p>
      )}
    </div>
  );
}
