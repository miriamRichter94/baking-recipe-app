export default function StepFields({ recipeStep, onChange }) {
  return (
    <>
      <label htmlFor="step">Step {recipeStep.stepNumber}</label>
      <textarea
        type="text"
        id="step"
        name="step"
        rows={5}
        maxLength={255}
        value={recipeStep.description}
        onChange={(event) => onChange("description", event.target.value)}
      />
    </>
  );
}
