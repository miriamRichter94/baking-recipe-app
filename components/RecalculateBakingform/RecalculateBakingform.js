import styled from "styled-components";
import { StyledBtn } from "../Button/StyledButton";
import BakingFormFields from "../RecipeFormular/BakingFormFields";
import { calculateScalingFactor } from "@/lib/helper";

export default function RecalculateBakingform({
  closeModal,
  recipeId,
  bakingform,
  onAddRecalculatedRecipe,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formDataObject = new FormData(event.target);
    const formData = Object.fromEntries(formDataObject);
    const scalingFactor = calculateScalingFactor(
      bakingform.shape,
      bakingform.diameter,
      bakingform.width,
      bakingform.length,
      formData.shape,
      formData?.diameter,
      formData?.width,
      formData?.length
    );

    onAddRecalculatedRecipe(
      recipeId,
      formData.shape,
      formData?.diameter,
      formData?.width,
      formData?.length,
      scalingFactor.toFixed(2)
    );

    closeModal();
  }

  return (
    <>
      <Title>Recalculate Ingredients</Title>
      <HintText>
        Scaling is based on pan surface area. Results assume the same batter
        height.
      </HintText>
      <form onSubmit={handleSubmit}>
        <StyledFieldset>
          <StyledLegend>Old Baking form</StyledLegend>
          <BakingFormFields
            shape={bakingform.shape}
            diameter={bakingform.diameter}
            width={bakingform.width}
            length={bakingform.length}
            readOnly={true}
          />
        </StyledFieldset>
        <StyledFieldset>
          <StyledLegend>New baking form</StyledLegend>
          <BakingFormFields />
        </StyledFieldset>
        <StyledBtn type="submit">Recalculate Ingredients</StyledBtn>
      </form>
    </>
  );
}

const Title = styled.h1`
  color: var(--text-color);
`;

const HintText = styled.p`
  font-style: italic;
  color: var(--text-color);
`;

const StyledFieldset = styled.fieldset`
  min-width: 0;
  background: #ffffff;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 20px;
  border: 1px solid #e8ddd2;
  color: var(--text-color);

  @media (min-width: 641px) {
    border: 1px solid #e8ddd2;
    border-radius: 12px;
    padding: 22px;
    margin-bottom: 28px;
    background: #ffffff;
  }
`;

const StyledLegend = styled.legend`
  font-family: var(--heading-font);
  font-size: 18px;
  padding: 0 8px;
  font-weight: 400;
`;
