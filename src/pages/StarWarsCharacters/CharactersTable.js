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
  storageCharacter,
  peopleSelector,
  updateCharacterFieldState,
  isSearchingSelector,
  updateCharacter,
} from "../../reducers/People/PeopleSlice";
import { requestCharacters } from "../../services/charactersService";
import { requestPlanetDetails } from "../../services/planetsService";
import { requestStarshipDetails } from "../../services/starshipsService";
import { tableCharactersColumns, test } from "./Constants";
import {
  TableTitle,
  FilterContainer,
  StyledSpan,
  InputContainer,
  InputStyled,
  SelectStyled,
  Loading,
  SpinnerLoading,
} from "./styles";

function CharactersTable() {
  const { planets } = useSelector(planetsSelector);
  const { starships } = useSelector(starshipSelector);
  const { people } = useSelector(peopleSelector);
  const { isSearching } = useSelector(isSearchingSelector);

  const { count = 0, results = [] } = people;

  const [characters, setCharacters] = useState(results);
  const [query, setQuery] = useState({ page: 3 });
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

  useEffect(() => {
    setCharacters(results);
  }, [results]);

  const dispatchPlanetRequest = (data, params) => {
    const { characterId } = params;
    dispatch(storagePlanet(data));
    dispatch(updateCharacter({ characterId, homeworld: data?.name }));
  };

  const dispatchStarshipRequest = (data, params) => {
    const { characterId } = params;
    dispatch(storageStarship(data));
    dispatch(updateCharacter({ characterId, starships: data }));
  };

  const dispatchPeopleRequest = (data) => {
    dispatch(storageCharacter(data));
    setCharacters(data?.results);
  };

  const fetchPlanet = (url, characterId) => {
    const planetStored = planets?.find((planet) => planet?.url === url);

    if (planetStored) {
      return planetStored;
    }
    dispatch(updateCharacterFieldState({ url: url }));
    requestPlanetDetails(url, dispatchPlanetRequest, {}, characterId);
    return planetStored;
  };

  const fetchStarship = (url, characterId) => {
    const starshipStored = starships?.find((starship) => starship?.url === url);

    if (starshipStored) {
      return starshipStored;
    }
    dispatch(updateCharacterFieldState({ url: url }));
    requestStarshipDetails(url, dispatchStarshipRequest, {}, characterId);
    return starshipStored;
  };

  const onPageChange = (pageNumber) => setQuery({ ...query, page: pageNumber });
  const onSearchQuery = (characterName) => setQuery({ search: characterName });
  const onFilterTable = (field, value) => {
    if (value === "all") return setCharacters(results);
    const filteredCharacters = results?.filter(
      (character) => character[field] === value
    );
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
      {isLoading && (
        <Loading>
          <SpinnerLoading />
        </Loading>
      )}
      {!isLoading && (
        <Table
          isSearching={isSearching}
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
      )}
    </div>
  );
}

export default CharactersTable;
