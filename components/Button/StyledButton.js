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
    background: #8b5e3c;
    color: #fff;
    border-radius: 8px;
    padding: 10px 20px;
    border: none;
  `,
  secondary: css`
    background: none;
    border: 1px solid #e8ddd2;
    color: #3d2b1f;
    border-radius: 8px;
    padding: 10px 20px;
  `,
  danger: css`
    background: none;
    border: 1px solid #b5473a;
    color: #b5473a;
    border-radius: 8px;
    padding: 10px 20px;
  `,
  ghost: css`
    background: none;
    border: none;
    color: #8b5e3c;
    padding: 0;
  `,
  pill: css`
    background: #8b5e3c;
    color: #fff;
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
