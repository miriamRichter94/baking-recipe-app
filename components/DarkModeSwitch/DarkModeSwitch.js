import styled from "styled-components";

export default function DarkModeSwitch({ isDarkMode, onToggleDarkMode }) {
  return (
    <Label>
      <Input type="checkbox" checked={isDarkMode} onChange={onToggleDarkMode} />
      <Slider />
    </Label>
  );
}

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 26px;
  cursor: pointer;
  flex-shrink: 0;
`;

const Slider = styled.span`
  position: absolute;
  inset: 0;
  background-color: var(--color-border);
  border: 2px solid var(--color-border);
  border-radius: 30px;
  transition: 0.3s;

  &::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    left: 2px;
    top: 2px;
    background-color: var(--color-surface);
    border-radius: 50%;
    transition: 0.3s;
  }

  &::after {
    content: "🌙";
    position: absolute;
    right: 4px;
    top: 2px;
    font-size: 12px;
    line-height: 18px;
    transition: 0.3s;
  }
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: var(--color-brand);
    border-color: var(--color-brand);
  }

  &:checked + ${Slider}::before {
    transform: translateX(26px);
  }

  &:checked + ${Slider}::after {
    content: "☀️";
    right: unset;
    left: 4px;
  }
`;
