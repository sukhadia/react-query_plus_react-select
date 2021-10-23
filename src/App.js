import React from "react";
import "./styles.css";
import Select from "react-select";
import useColorSearch from "./useColorSearch";
import ColorCombo from "./ColorCombo";
import debounce from "lodash.debounce";

export default function App() {
  const [selectedPrimrayColor, setSelectedPrimaryColor] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [inputText, setInpuText] = React.useState("");
  const setSearchTextDebounced = React.useRef(
    debounce(searchText => setSearchText(searchText), 500)
  ).current;
  
  const { status: searchStatus, data: colorSearchResults } = useColorSearch(
    searchText
  );

  const handleChangePrimary = (selectedItem, event) => {
    setSelectedPrimaryColor(selectedItem);
   };

  const handleInputChangePrimary = (inputText, event) => {
    // prevent outside click from resetting inputText to ""
    if (event.action !== "input-blur" && event.action !== "menu-close") {
      setInpuText(inputText);
      setSearchTextDebounced(inputText);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(
      JSON.stringify(
        {
          primary: selectedPrimrayColor,
        },
        null,
        2
      )
    );
  };

  const handleReset = () => {
    setSelectedPrimaryColor(null);
    setSearchText("");
  };

  return (
    <div className="App">
      <h1>Color Search</h1>
      <div>Search Status: {searchStatus}</div>
      <form onSubmit={handleSubmit}>
        <h2>Primary Color</h2>
        <Select
          noOptionsMessage={() => "No colors found"}
          placeholder={"Search for a color"}
          isClearable={true}
          isLoading={searchStatus === "loading"}
          inputValue={inputText}
          value={selectedPrimrayColor}
          options={colorSearchResults}
          getOptionLabel={color => color.name}
          onChange={handleChangePrimary}
          onInputChange={handleInputChangePrimary}
        />
        
        <button
          type="submit"
          disabled={!selectedPrimrayColor}
        >
          Submit
        </button>
        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </form>

      <ColorCombo
        selectedPrimrayColor={selectedPrimrayColor}
      />
    </div>
  );
}
