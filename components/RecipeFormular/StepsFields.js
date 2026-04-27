import {
  StepBadge,
  StepTextarea,
  RemoveBtn,
  DesktopIngredientRow,
} from "@/styles/components/FormPage.styled";

export default function StepFields({ recipeStep, onChange, onRemove }) {
  return (
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

      <input
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

      {onRemove && (
        <RemoveBtn type="button" onClick={onRemove} style={{ fontSize: 18, marginTop: 8 }}>×</RemoveBtn>
      )}
    </DesktopIngredientRow>
  );
}
