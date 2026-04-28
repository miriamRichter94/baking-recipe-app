import { useRef } from "react";
import {
  StepBadge,
  StepTextarea,
  RemoveBtn,
  DesktopIngredientRow,
  StepAddPhotoBtn,
  StepImagePreview,
  StepRemoveImageBtn,
} from "@/styles/components/FormPage.styled";

export default function StepFields({ recipeStep, onChange, onRemove }) {
  const fileRef = useRef(null);
  const imageSrc = recipeStep.image
    ? typeof recipeStep.image === "string"
      ? recipeStep.image
      : URL.createObjectURL(recipeStep.image)
    : null;

  return (
    <div style={{ marginBottom: 20 }}>
      <DesktopIngredientRow style={{ alignItems: "flex-start" }}>
        <StepBadge style={{ marginTop: 6 }}>{recipeStep.order}</StepBadge>
        <StepTextarea
          id="instruction"
          name="instruction"
          rows={2}
          maxLength={255}
          placeholder="Describe this step..."
          value={recipeStep.instruction}
          onChange={(e) => onChange("instruction", e.target.value)}
        />
        {onRemove && (
          <RemoveBtn
            type="button"
            onClick={onRemove}
            style={{ fontSize: 18, marginTop: 8 }}
          >
            ×
          </RemoveBtn>
        )}
      </DesktopIngredientRow>

      <div style={{ marginLeft: 42, marginTop: 8 }}>
        <input
          ref={fileRef}
          type="file"
          id={`stepImage-${recipeStep.order}`}
          name="stepImage"
          style={{ display: "none" }}
          onChange={(e) => onChange("image", e.target.files[0])}
        />
        <input
          type="text"
          id={`stepImageUrl-${recipeStep.order}`}
          name="stepImageUrl"
          defaultValue={recipeStep.image ?? ""}
          readOnly
          style={{ display: "none" }}
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
      </div>
    </div>
  );
}
