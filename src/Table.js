import { useEffect, useState } from "react";
import StickyHeadTable from "./StickyHeadTable";

function Table({ filteredKeys, data }) {
  const [rows, setRows] = useState([]);
  const columns = [
    // { id: "sno", label: "S.No.", minWidth: 170 },
    { id: "key", label: "KEY", minWidth: 100 },
    { id: "value", label: "VALUES", minWidth: 100 },

    //   {
    //     id: "population",
    //     label: "Population",
    //     minWidth: 170,
    //     align: "right",
    //     format: (value) => value.toLocaleString("en-US"),
    //   }
  ];
  function createData(key) {
    return { key: key, value: data[key].join(",") };
  }

  useEffect(() => {
    setRows(filteredKeys.map((key) => createData(key)));
  }, [filteredKeys]);

  return (
    <>
      <div className="table-container">
        <StickyHeadTable columns={columns} rows={rows} />
      </div>
    </>
  );
}

export { Table };
