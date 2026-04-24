/*
 *
 * Units requests
 *
 */
export async function getAllUnits() {
  const res = await fetch("/api/units");

  if (!res.ok) throw new Error("Failed to fetch units");
  return res.json();
}
