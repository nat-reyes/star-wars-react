export const tableCharactersColumns = (fetchPlanet, fetchStarship) => [
  {
    Header: "Name",
    index: "name",
    render: (value) => value,
  },
  {
    Header: "Height",
    index: "height",
  },
  {
    Header: "Weight",
    index: "mass",
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
    request: (url, isArray) => fetchStarship(url, isArray),
    width: "300px",
  },
];
