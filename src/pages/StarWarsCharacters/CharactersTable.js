import { useEffect, useState } from "react";
import { requestCharacters } from "../../services/charactersService";
import { tableCharactersColumns } from "./Constants";
import { TableTitle } from "./styles";
import Table from "../../components/Table";

function CharactersTable() {
  const [characters, setCharacters] = useState({});
  useEffect(() => {
    requestCharacters(setCharacters);
  }, []);

  return (
    <div style={{ marginTop: "4rem", padding: "1rem" }}>
      <TableTitle> STAR WARS CHARACTERS</TableTitle>
      <Table columns={tableCharactersColumns()} data={characters} />
    </div>
  );
}

export default CharactersTable;
