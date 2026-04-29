import { useRef } from "react";
import styled from "styled-components";

export default function StepFields({ recipeStep, onChange, onRemove }) {
  const fileRef = useRef(null);
  const imageSrc = recipeStep.image
    ? typeof recipeStep.image === "string"
      ? recipeStep.image
      : URL.createObjectURL(recipeStep.image)
    : null;

  return (
    <StepWrapper>
      <StepRow>
        <StepBadge>{recipeStep.order}</StepBadge>
        <StepTextarea
          id="instruction"
          name="instruction"
          rows={2}
          maxLength={255}
          placeholder="Describe the step..."
          value={recipeStep.instruction}
          onChange={(e) => onChange("instruction", e.target.value)}
        />
        {onRemove && (
          <RemoveStepButton type="button" onClick={onRemove}>
            ×
          </RemoveStepButton>
        )}
      </StepRow>

      <ImageInputWrapper>
        <input
          ref={fileRef}
          type="file"
          id={`stepImage-${recipeStep.order}`}
          name="stepImage"
          style={{ display: "none" }}
          onChange={(e) => onChange("image", e.target.files[0])}
        />
        {imageSrc ? (
          <>
            <StepImagePreview>
              <img src={imageSrc} alt={`Step ${recipeStep.order}`} />
            </StepImagePreview>
            <StepRemoveImageBtn
              type="button"
              onClick={() => onChange("image", "")}
            >
              Remove image
            </StepRemoveImageBtn>
          </>
        ) : (
          <StepAddPhotoBtn
            type="button"
            onClick={() => fileRef.current?.click()}
          >
            📷 Add step image (optional)
          </StepAddPhotoBtn>
        )}
      </ImageInputWrapper>
    </StepWrapper>
  );
}

const StepWrapper = styled.div`
  margin-bottom: 20px;
`;

const RemoveStepButton = styled.button`
  background: none;
  border: none;
  color: #8c7b6b;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  line-height: 1;
  margin-top: 8px;
`;

// ── Step image controls (used on both mobile + desktop) ──

// Wrapper that indents under the step text, with image preview
const StepImagePreview = styled.div`
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
const StepAddPhotoBtn = styled.button`
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
const StepRemoveImageBtn = styled.button`
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

const StepBadge = styled.div`
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
  margin-top: 6px;

  @media (min-width: 641px) {
    width: 30px;
    height: 30px;
    background: #8b5e3c;
    color: #fff;
    font-size: 13px;
    margin-top: 6px;
  }
`;

const StepTextarea = styled.textarea`
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

const StepRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: flex-start;
`;

const ImageInputWrapper = styled.div`
  margin-left: 42px;
  margin-top: 8px;
`;
