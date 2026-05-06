import styled, { css } from "styled-components";

export default function StyledButton({
  children,
  variant = "primary",
  full,
  onClick,
  style,
  ...rest
}) {
  return (
    <StyledBtn
      $variant={variant}
      $full={full}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {children}
    </StyledBtn>
  );
}

// ─── Styled Components ───────────────────────────────────────────────────────

const variantStyles = {
  primary: css`
    background: var(--color-brand);
    color: var(--color-surface-alt);
    border-radius: 8px;
    padding: 10px 20px;
    border: none;
  `,
  secondary: css`
    background: none;
    border: 1px solid var(--color-border);
    color: var(--color-text);
    border-radius: 8px;
    padding: 10px 20px;
  `,
  danger: css`
    background: none;
    border: 1px solid var(--color-danger);
    color: var(--color-danger);
    border-radius: 8px;
    padding: 10px 20px;
  `,
  ghost: css`
    background: none;
    border: none;
    color: var(--color-brand);
    padding: 0;
  `,
  pill: css`
    background: var(--color-brand);
    color: var(--color-surface-alt);
    border-radius: 40px;
    padding: 12px 28px;
    border: none;
  `,
};

export const StyledBtn = styled.button`
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  ${({ $variant }) => variantStyles[$variant] ?? variantStyles.primary}
  ${({ $full }) =>
    $full &&
    css`
      width: 100%;
      justify-content: center;
    `}
`;
