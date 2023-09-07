import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import languageStore from "../store/LanguageStore";
import { languageType } from "../types/languageType";

function SelectComponent() {
  const [lang, setLang] = useState(languageStore.current);
  useEffect(() => {
    languageStore.setLang(lang);
  }, [lang]);
  return (
    <>
      <Select
        onChange={(event) => {
          setLang(event.target.value as languageType);
        }}
        value={lang}
      >
        <option value="ru">RUS</option>
        <option value="en">ENG</option>
        <option value="ee">EST</option>
      </Select>
    </>
  );
}

export default SelectComponent;
