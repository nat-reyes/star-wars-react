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
    render: (value) => metersToCm(value),
  },
  {
    Header: "Weight",
    index: "mass",
    render: (value) => `${value} kg`,
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
    request: (url) => fetchPlanet(url),
    render: (value) => (value ? value?.name : "No data"),
  },
  {
    Header: "Starships",
    index: "starships",
    request: (url) => fetchStarship(url),
    width: "300px",
    render: (value) => {
      const starshipColumnValue = value
        ? `${value?.model} - ${value?.manufacturer}`
        : "No data";
      return (
        <>
          - {starshipColumnValue}
          <br />
        </>
      );
    },
  },
];
