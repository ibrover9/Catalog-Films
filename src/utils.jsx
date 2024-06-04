export function nameRestriction(nameFilm) {
  const nameRestriction =
    nameFilm.length > 15 ? nameFilm.substring(0, 15) + "..." : nameFilm;
  return nameRestriction;
}
