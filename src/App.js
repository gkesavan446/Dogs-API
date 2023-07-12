import "./App.css";
import { useEffect, useState } from "react";
import { Search } from "./Search";
import { Table } from "./Table";
import { toast } from "react-toastify";

function App() {
  const [data, setData] = useState({});
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [filteredKeys, setFilteredKeys] = useState([]);

  async function getBreedsData() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    if (response.status === 200) {
      const fetchedData = await response.json();
      setData(fetchedData.message);
      console.log("fetched data", fetchedData.message);
      setFilteredKeys(Object.keys(fetchedData.message));
      toast.success("fetched");
    } else {
      toast.error(response.statusText);
    }
  }
  useEffect(() => {
    getBreedsData();
  }, []);

  useEffect(() => {
    if (searchKeyWord) {
      const filteredArray = Object.keys(data).filter((key) =>
        key.toUpperCase().includes(searchKeyWord.toUpperCase())
      );
      console.log("filtered data", filteredArray);
      setFilteredKeys(filteredArray);
    } else {
      setFilteredKeys(Object.keys(data));
    }
  }, [searchKeyWord]);

  return (
    <div className="App">
      <header className="App-header section">
        <h1 className="page-title">DOGS API TASK </h1>
        <Search
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
        />
      </header>
      <main className="section">
        <Table filteredKeys={filteredKeys} data={data} />
      </main>
    </div>
  );
}

export default App;
