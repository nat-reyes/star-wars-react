import { capitalize, metersToCm } from "../../utils/formatFields";

export const tableCharactersColumns = (fetchPlanet, fetchStarship) => [
  {
    Header: "Name",
    index: "name",
    render: (value) => capitalize(value),
  },
  {
    Header: "Height",
    index: "height",
    render: (value) => (value !== "unknown" ? metersToCm(value) : "Unknown"),
  },
  {
    Header: "Weight",
    index: "mass",
    render: (value) => {
      return value !== "unknown" ? `${value} kg` : "Unknown";
    },
  },
  {
    Header: "Hair Color",
    index: "hair_color",
    render: (value) => capitalize(value),
  },
  {
    Header: "Eye Color",
    index: "eye_color",
    render: (value) => capitalize(value),
  },
  {
    Header: "Birth Year",
    index: "birth_year",
    render: (value) => value,
  },
  {
    Header: "Gender",
    index: "gender",
    render: (value) => capitalize(value),
  },
  {
    Header: "Planet",
    index: "homeworld",
    request: (url, characterId) => fetchPlanet(url, characterId),
    render: (value) => value || "No data",
  },
  {
    Header: "Starships",
    index: "starships",
    request: (url, characterId) => fetchStarship(url, characterId),
    width: "300px",
    render: (value) => {
      const starshipColumnValue = value?.url
        ? `${value?.model} - ${value?.manufacturer}`
        : "No data";
      return (
        <>
          - {starshipColumnValue}
          <br />
          <br />
        </>
      );
    },
  },
];
