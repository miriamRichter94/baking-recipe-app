import styled, { css } from "styled-components";

export default function InputField({
  label,
  placeholder,
  type,
  rows,
  defaultValue,
  name,
  id,
  required = false,
  readOnly = false,
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
          required={required}
          readOnly={readOnly}
        />
      ) : (
        <StyledInput
          id={inputId}
          name={name}
          type={type || "text"}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
          readOnly={readOnly}
        />
      )}
    </FieldWrapper>
  );
}

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
  color: var(--color-text-muted);
`;

const inputBase = css`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 15px;
  background: #ffffff;
  box-sizing: border-box;
  outline: none;
  color: var(--color-text);
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--color-brand);
  }

  @media (min-width: 641px) {
    padding: 12px 16px;
  }
`;

export const StyledInput = styled.input`
  ${inputBase}

  &:read-only {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledTextarea = styled.textarea`
  ${inputBase}
  resize: vertical;
`;
