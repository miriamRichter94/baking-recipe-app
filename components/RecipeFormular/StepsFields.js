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

      <label htmlFor={`stepImage-${recipeStep.order}`}>
        Step Image {recipeStep.order}
      </label>
      <input
        type="file"
        id={`stepImage-${recipeStep.order}`}
        name="stepImage"
        onChange={(event) => onChange("image", event.target.files[0])}
      />
    </>
  );
}
