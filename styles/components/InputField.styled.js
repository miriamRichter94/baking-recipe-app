import styled, { css } from "styled-components";

// ─── Styled Components ───────────────────────────────────────────────────────

export const FieldWrapper = styled.div`
  margin-bottom: 18px;

  @media (min-width: 641px) {
    margin-bottom: 24px;
  }
`;

export const FieldLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #8c7b6b;
`;

const inputBase = css`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e8ddd2;
  border-radius: 8px;
  font-size: 15px;
  font-family: var(--font-body), sans-serif;
  background: #ffffff;
  box-sizing: border-box;
  outline: none;
  color: #3d2b1f;
  transition: border-color 0.2s;

  &:focus {
    border-color: #8b5e3c;
  }

  @media (min-width: 641px) {
    padding: 12px 16px;
  }
`;

export const StyledInput = styled.input`
  ${inputBase}
`;

export const StyledTextarea = styled.textarea`
  ${inputBase}
  resize: vertical;
`;

// ─── Blueprint Component ──────────────────────────────────────────────────────
//
// Props:
//   label        – field label text
//   placeholder  – placeholder text
//   type         – input type (default: "text")
//   rows         – if provided, renders a <textarea> instead of <input>
//   defaultValue – prefill value
//   name         – form field name (important for form submission)
//   id           – input id (links label to input)
//
// Usage:
//   <InputField label="Recipe title" placeholder="What are we baking?" name="title" />
//   <InputField label="Description" placeholder="Tell us about this recipe…" rows={3} name="description" />
//   <InputField label="Diameter (cm)" type="number" placeholder="26" name="diameter" />

export default function InputField({
  label,
  placeholder,
  type,
  rows,
  defaultValue,
  name,
  id,
}) {
  const inputId = id || name;
  return (
    <FieldWrapper>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      {rows ? (
        <StyledTextarea
          id={inputId}
          name={name}
          rows={rows}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      ) : (
        <StyledInput
          id={inputId}
          name={name}
          type={type || "text"}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      )}
    </FieldWrapper>
  );
}
