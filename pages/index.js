export default function HomePage({ ingredients }) {
  return (
    <div>
      <h1>Hello from Next.js</h1>
      <a href="/form/create">Add a Recipe here!</a>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            {ingredient.name} ({ingredient.nameDe})
          </li>
        ))}
      </ul>
    </div>
  );
}
