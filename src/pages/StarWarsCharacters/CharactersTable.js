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
import {
  storagePeople,
  peopleSelector,
} from "../../reducers/People/PeopleSlice";
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
  SelectStyled,
} from "./styles";

function CharactersTable() {
  const { planets } = useSelector(planetsSelector);
  const { starships } = useSelector(starshipSelector);
  const { people } = useSelector(peopleSelector);

  const { count = 0, results = [] } = people;

  const [characters, setCharacters] = useState(results);
  const [query, setQuery] = useState({ page: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const noData = !characters?.length;

  const fetchStarWarsCharacters = () => {
    setIsLoading(true);
    requestCharacters(dispatchPeopleRequest, query, setIsLoading);
  };

  useEffect(() => {
    fetchStarWarsCharacters();
  }, [query]);

  const dispatchPlanetRequest = (data) => dispatch(storagePlanet(data));

  const dispatchStarshipRequest = (data) => dispatch(storageStarship(data));

  const dispatchPeopleRequest = (data) => {
    dispatch(storagePeople(data));
    setCharacters(data?.results);
  };

  const fetchPlanet = (url) => {
    const planetStored = planets?.find((planet) => planet?.url === url);

    if (planetStored) {
      return planetStored;
    }

    requestPlanetDetails(url, dispatchPlanetRequest);
    return planetStored;
  };

  const fetchStarship = (url) => {
    const starshipStored = starships?.find((starship) => starship?.url === url);

    if (starshipStored) {
      return starshipStored;
    }

    requestStarshipDetails(url, dispatchStarshipRequest);

    return starshipStored;
  };

  const onPageChange = (pageNumber) => setQuery({ ...query, page: pageNumber });
  const onSearchQuery = (characterName) => setQuery({ search: characterName });
  const onFilterTable = (field, value) => {
    console.log(field, value);
    if (value === "all") return setCharacters(results);
    const filteredCharacters = results?.filter(
      (character) => character[field] === value
    );
    console.log(filteredCharacters);
    setCharacters(filteredCharacters);
  };
  return (
    <div style={{ marginTop: "1rem", padding: "1rem" }}>
      <TableTitle> STAR WARS CHARACTERS</TableTitle>
      <FilterContainer>
        <StyledSpan>
          <span> Character: </span>
        </StyledSpan>
        <InputContainer>
          <InputStyled
            onChange={(value) => onSearchQuery(value?.target?.value)}
            type="text"
            id="character-name-filter"
            name="character name"
          />
        </InputContainer>
        <StyledSpan>
          <span> Gender: </span>
        </StyledSpan>
        <InputContainer>
          <SelectStyled
            name="gender"
            onChange={(e) => onFilterTable("gender", e?.target?.value)}
            id="gender-fiter"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="none">None</option>
            <option value="all" selected>
              All
            </option>
          </SelectStyled>
        </InputContainer>
      </FilterContainer>
      <Table
        isLoading={isLoading}
        noData={noData}
        columns={tableCharactersColumns(fetchPlanet, fetchStarship)}
        data={characters}
        onPageChange={onPageChange}
        pagination={{
          pageCount: count,
          page: query?.page,
          pageSize: 10,
        }}
      />
    </div>
  );
}

export default CharactersTable;
