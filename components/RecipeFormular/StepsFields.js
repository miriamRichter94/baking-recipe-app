export default function StepFields({ recipeStep, onChange }) {
  return (
    <>
      <label htmlFor="instruction">Step {recipeStep.order}</label>
      <textarea
        type="text"
        id="instruction"
        name="instruction"
        rows={5}
        maxLength={255}
        value={recipeStep.instruction}
        onChange={(event) => onChange("instruction", event.target.value)}
      />
    </>
  );
}
