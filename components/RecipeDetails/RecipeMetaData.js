import styled from "styled-components";

export default function RecipeMetaData({
  title,
  description,
  bakingForm,
  ingredientsLength,
  stepLength,
}) {
  return (
    <>
      <Title>{title}</Title>
      <Description>{description}</Description>

      <TagRow>
        <MetaTag>🥣 {ingredientsLength} ingredients</MetaTag>
        <MetaTag>📋 {stepLength} steps</MetaTag>
        <MetaTag>
          📐 {bakingForm.shape} ·
          {bakingForm.shape === "round"
            ? bakingForm.diameter
            : `${bakingForm.width} cm x ${bakingForm.length} cm`}
        </MetaTag>
      </TagRow>
    </>
  );
}

const Title = styled.h1`
  font-family: var(--heading-font);
  font-size: 28px;
  margin: 0 0 8px;
  font-weight: 400;

  @media (min-width: 641px) {
    font-size: 36px;
    margin: 0 0 12px;
  }
`;

const Description = styled.p`
  color: var(--color-text-muted);
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 24px;
  order: -1;

  @media (min-width: 641px) {
    font-size: 16px;
    margin: 0 0 20px;
    order: 0;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
`;

const MetaTag = styled.span`
  padding: 5px 14px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 600;
  background: var(--color-brand-light);
  color: var(--color-brand);
`;
