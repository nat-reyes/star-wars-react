export const tableCharactersColumns = (fetchPlanet, fetchStarship) => [
  {
    Header: "Name",
    index: "name",
  },
  {
    Header: "Height",
    index: "height",
  },
  {
    Header: "Hair Color",
    index: "hair_color",
  },
  {
    Header: "Eye Color",
    index: "eye_color",
  },
  {
    Header: "Birth Year",
    index: "birth_year",
  },
  {
    Header: "Gender",
    index: "gender",
  },
  {
    Header: "Planet",
    index: "homeworld",
    request: (url) => fetchPlanet(url),
  },
  {
    Header: "Starships",
    index: "starships",
    request: (url) => fetchStarship(url),
    width: "300px",
  },
];
