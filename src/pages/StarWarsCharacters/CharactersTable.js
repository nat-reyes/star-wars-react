import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components";
import {
  storagePlanet,
  planetsSelector,
} from "../../reducers/Planets/PlanetsSlice";
import {
  storageStarship,
  starshipSelector,
} from "../../reducers/Starships/StarshipsSlice";
import { requestCharacters } from "../../services/charactersService";
import { requestPlanetDetails } from "../../services/planetsService";
import { requestStarshipDetails } from "../../services/starshipsService";
import { tableCharactersColumns } from "./Constants";
import {
  TableTitle,
  FilterContainer,
  StyledSpan,
  InputContainer,
  InputStyled,
} from "./styles";

function CharactersTable() {
  const [characters, setCharacters] = useState({
    results: [],
    pageCount: 0,
  });
  const { planets } = useSelector(planetsSelector);
  const { starships } = useSelector(starshipSelector);

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

  const fetchStarship = (url, isArray) => {
    const starshipStored = starships?.find((starship) => starship?.url === url);
    const starshipColumnValue = `${starshipStored?.model} - ${starshipStored?.manufacturer}`;

    const starshipLineBreak = () => (
      <>
        - {starshipColumnValue}
        <br />
      </>
    );

    if (starshipStored) {
      return isArray ? starshipLineBreak() : starshipColumnValue;
    }

    requestStarshipDetails(url, dispatchStarshipRequest);

    return isArray ? starshipLineBreak() : starshipColumnValue;
  };

  const onPageChange = (pageNumber) => setQuery({ ...query, page: pageNumber });
  const onFilterTable = (characterName) => setQuery({ search: characterName });

  return (
    <div style={{ marginTop: "1rem", padding: "1rem" }}>
      <TableTitle> STAR WARS CHARACTERS</TableTitle>
      <FilterContainer>
        <StyledSpan>
          <span> Character: </span>
        </StyledSpan>
        <InputContainer>
          <InputStyled
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
