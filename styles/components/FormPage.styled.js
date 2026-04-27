import styled from "styled-components";

export const PageWrapper = styled.div`
  background: #faf6f1;
  min-height: 100vh;
  font-family: var(--font-body), sans-serif;
  color: #3d2b1f;
  padding-bottom: 40px;
`;

// ── Mobile: sticky header bar ──

export const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e8ddd2;
  position: sticky;
  top: 0;
  background: #faf6f1;
  z-index: 10;
`;

export const MobileBackBtn = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
  color: #3d2b1f;
  font-family: var(--font-body), sans-serif;
  padding: 0;
`;

export const MobileSaveBtn = styled.button`
  background: #8b5e3c;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 9px 22px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-body), sans-serif;
`;

export const FormPageTitle = styled.h1`
  font-family: var(--font-heading), serif;
  font-size: 26px;
  margin: 0 0 24px;
  font-weight: 400;

  @media (min-width: 641px) {
    font-size: 36px;
    margin: 0 0 32px;
  }
`;

// ── Photo upload ──

export const PhotoUploadMobile = styled.div`
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  background: #e8d5c4;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
`;

export const PhotoIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const PhotoUploadLabel = styled.span`
  font-size: 13px;
  color: #8b5e3c;
  font-weight: 500;
`;

export const PhotoUploadDesktop = styled.div`
  border: 2px dashed #e8ddd2;
  border-radius: 12px;
  padding: 36px;
  text-align: center;
  background: #ffffff;
  color: #8c7b6b;
  font-size: 14px;
  margin-bottom: 28px;
  cursor: pointer;
`;

// ── Section card (mobile) ──

export const SectionCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 20px;
  border: 1px solid #e8ddd2;
`;

export const SectionCardTitle = styled.h3`
  font-family: var(--font-heading), serif;
  font-size: 17px;
  margin: 0 0 14px;
  font-weight: 400;
`;

// ── Shape toggle (mobile) ──

export const ShapeToggleRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
`;

export const ShapeToggleBtn = styled.button`
  flex: 1;
  padding: 10px 0;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-transform: capitalize;
  font-family: var(--font-body), sans-serif;

  background: ${({ $active }) => ($active ? "#8b5e3c" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#8c7b6b")};
  border: ${({ $active }) => ($active ? "none" : "1px solid #e8ddd2")};
`;

// ── Ingredient / Step rows ──

export const IngredientItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #faf6f1;
  border-radius: 10px;
  margin-bottom: 8px;
  font-size: 14px;
`;

export const IngredientItemAmount = styled.span`
  flex: 1;
  color: #8b5e3c;
  font-weight: 600;
`;

export const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #8c7b6b;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  line-height: 1;
`;

export const AddRowBtn = styled.button`
  width: 100%;
  padding: 11px;
  border-radius: 10px;
  border: 1.5px dashed #e8d5c4;
  background: transparent;
  color: #8b5e3c;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-body), sans-serif;
`;

export const StepRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const StepBadge = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #e8d5c4;
  color: #8b5e3c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 4px;

  @media (min-width: 641px) {
    width: 30px;
    height: 30px;
    background: #8b5e3c;
    color: #fff;
    font-size: 13px;
    margin-top: 6px;
  }
`;

export const StepTextBox = styled.div`
  flex: 1;
  padding: 9px 12px;
  background: #faf6f1;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.5;
`;

// ── Mobile: editable ingredient row ──
// Replaces the old static IngredientItem when in edit mode

export const MobileIngredientEditRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const MobileInput = styled.input`
  padding: 10px 12px;
  background: #faf6f1;
  border-radius: 10px;
  border: 1px solid #e8ddd2;
  font-size: 14px;
  font-family: var(--font-body), sans-serif;
  color: #3d2b1f;
  outline: none;

  &:focus {
    border-color: #8b5e3c;
  }
`;

export const MobileUnitSelect = styled.select`
  width: 58px;
  padding: 10px 4px;
  background: #faf6f1;
  border-radius: 10px;
  border: 1px solid #e8ddd2;
  font-size: 14px;
  font-family: var(--font-body), sans-serif;
  color: #3d2b1f;
`;

// ── Mobile: editable step textarea ──

export const MobileStepTextarea = styled.textarea`
  flex: 1;
  padding: 9px 12px;
  background: #faf6f1;
  border-radius: 10px;
  border: 1px solid #e8ddd2;
  font-size: 14px;
  font-family: var(--font-body), sans-serif;
  line-height: 1.5;
  resize: vertical;
  outline: none;
  color: #3d2b1f;

  &:focus {
    border-color: #8b5e3c;
  }
`;

// ── Step image controls (used on both mobile + desktop) ──

// Wrapper that indents under the step text, with image preview
export const StepImagePreview = styled.div`
  margin-top: 8px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    display: block;

    @media (min-width: 641px) {
      height: 120px;
    }
  }
`;

// "+ Add photo" or "📷 Add step image (optional)" button
export const StepAddPhotoBtn = styled.button`
  background: none;
  border: 1px dashed #e8ddd2;
  border-radius: 8px;
  padding: 8px 14px;
  color: #c49a6c;
  font-size: 13px;
  cursor: pointer;
  font-family: var(--font-body), sans-serif;
  margin-top: 8px;
  display: block;
`;

// "Remove image" danger text link
export const StepRemoveImageBtn = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: #b5473a;
  cursor: pointer;
  padding: 0;
  margin-top: 4px;
  font-family: var(--font-body), sans-serif;
  display: inline-block;
`;

// ── Desktop: fieldset ──

export const StyledFieldset = styled.fieldset`
  border: 1px solid #e8ddd2;
  border-radius: 12px;
  padding: 22px;
  margin-bottom: 28px;
  background: #ffffff;
`;

export const StyledLegend = styled.legend`
  font-family: var(--font-heading), serif;
  font-size: 18px;
  padding: 0 8px;
  font-weight: 400;
`;

export const DesktopIngredientRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: center;
`;

export const IngredientInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #e8ddd2;
  border-radius: 8px;
  font-size: 14px;
  font-family: var(--font-body), sans-serif;
  outline: none;
  color: #3d2b1f;

  &:focus {
    border-color: #8b5e3c;
  }
`;

export const UnitSelect = styled.select`
  width: 70px;
  padding: 10px 8px;
  border: 1px solid #e8ddd2;
  border-radius: 8px;
  font-size: 14px;
  font-family: var(--font-body), sans-serif;
  color: #3d2b1f;
  background: #ffffff;
`;

export const AddDashedBtn = styled.button`
  background: none;
  border: 1px dashed #c49a6c;
  border-radius: 8px;
  padding: 10px 16px;
  color: #8b5e3c;
  font-size: 14px;
  cursor: pointer;
  font-family: var(--font-body), sans-serif;
`;

export const StepTextarea = styled.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e8ddd2;
  border-radius: 8px;
  font-size: 14px;
  font-family: var(--font-body), sans-serif;
  background: #fff;
  resize: vertical;
  outline: none;
  color: #3d2b1f;

  &:focus {
    border-color: #8b5e3c;
  }
`;
