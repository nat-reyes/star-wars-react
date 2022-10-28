import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Table from "../../components/Table";
import { storagePlanet } from "../../reducers/Planets/PlanetsSlice";
import { planetsSelector } from "../../reducers/Planets/PlanetsSlice";
import { storageStarship } from "../../reducers/Starships/StarshipsSlice";
import { starshipSelector } from "../../reducers/Starships/StarshipsSlice";
import { requestCharacters } from "../../services/charactersService";
import { requestPlanetDetails } from "../../services/planetsService";
import { requestStarshipDetails } from "../../services/starshipsService";
import { tableCharactersColumns } from "./Constants";
import {
  TableTitle,
  FilterContainer,
  StyledSpan,
  InputContainer,
} from "./styles";

function CharactersTable() {
  const [characters, setCharacters] = useState({
    results: [],
    pageCount: 0,
  });
  const { planets } = useSelector(planetsSelector);
  const { starships } = useSelector(starshipSelector);

  console.log(starships);

  const [query, setQuery] = useState({ page: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const noData = !characters?.results?.length;

  const fetchStarWarsCharacters = () => {
    setIsLoading(true);
    requestCharacters(setCharacters, query, setIsLoading);
  };

  useEffect(() => {
    fetchStarWarsCharacters();
  }, [query]);

  const dispatchPlanetRequest = (data) => dispatch(storagePlanet(data));

  const dispatchStarshipRequest = (data) => dispatch(storageStarship(data));

  const fetchPlanet = (url) => {
    const planetStored = planets?.find((planet) => planet?.url === url);

    if (planetStored) {
      return planetStored?.name;
    }

    requestPlanetDetails(url, dispatchPlanetRequest);
    return planets?.find((planet) => planet?.url === url)?.name;
  };

  const fetchStarship = (url) => {
    const starshipStored = starships?.find((starship) => starship?.url === url);

    if (starshipStored) {
      return `${starshipStored?.model} - ${starshipStored?.manufacturer}`;
    }

    requestStarshipDetails(url, dispatchStarshipRequest);

    const newStarship = starships?.find((starship) => starship?.url === url);
    return `${newStarship?.model} - ${newStarship?.manufacturer}`;
  };

  const onPageChange = (pageNumber) => setQuery({ ...query, page: pageNumber });
  const onFilterTable = (characterName) => setQuery({ search: characterName });
  // voy a necesitar aplicar redux para hacer storage de la data que traiga de planets y asi no repetir request
  // revisar los request si estan haciendose de mas
  return (
    <div style={{ marginTop: "1rem", padding: "1rem" }}>
      <TableTitle> STAR WARS CHARACTERS</TableTitle>
      <FilterContainer>
        <StyledSpan>
          <span> Character: </span>
        </StyledSpan>
        <InputContainer>
          <input
            onChange={(value) => onFilterTable(value?.target?.value)}
            type="text"
            id="character-name"
            name="character name"
          />
        </InputContainer>
      </FilterContainer>
      <Table
        isLoading={isLoading}
        noData={noData}
        columns={tableCharactersColumns(fetchPlanet, fetchStarship)}
        data={characters?.results}
        onPageChange={onPageChange}
        pagination={{
          pageCount: characters?.count,
          page: query?.page,
          pageSize: 10,
        }}
      />
    </div>
  );
}

export default CharactersTable;
