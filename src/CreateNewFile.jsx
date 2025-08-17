import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8080";

export default function CreateNewFile() {
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([{ name: "", type: "VARCHAR(255)" }]);
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(false);

  const addColumn = () => setColumns([...columns, { name: "", type: "VARCHAR(255)" }]);
  const removeColumn = (idx) => setColumns(columns.filter((_, i) => i !== idx));
  const handleColumnChange = (idx, field, val) => {
    const next = [...columns];
    next[idx][field] = val;
    setColumns(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tableName.trim()) return alert("Table name is required");
    if (columns.some(c => !c.name.trim())) return alert("All column names are required");

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/create-table`, {
        tableName,
        columns
      });
      // res.data includes schema now
      setSchema(res.data);
      alert("Table created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating table");
    } finally {
      setLoading(false);
    }
  };

  // const reloadSchema = async () => {
  //   if (!tableName) return;
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(`${API_BASE}/api/table/${encodeURIComponent(tableName)}/schema`);
  //     setSchema(res.data);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Could not load schema");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div style={{ padding: 20, maxWidth: 760 }}>
      <h2>Create New File</h2>

      <form onSubmit={handleSubmit} className="card p-3">
        <label className="form-label">File Name</label>
        <input
          className="form-control mb-3"
          type="text"
          placeholder="e.g., expenses_aug"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />

        <label className="form-label">Columns</label>
        {columns.map((col, i) => (
          <div key={i} className="d-flex gap-2 mb-2">
            <input
              className="form-control"
              placeholder="Column name"
              value={col.name}
              onChange={(e) => handleColumnChange(i, "name", e.target.value)}
            />
            <select
              className="form-select"
              value={col.type}
              onChange={(e) => handleColumnChange(i, "type", e.target.value)}
            >
              <option value="VARCHAR(255)">VARCHAR(255)</option>
              <option value="INT">INT</option>
              <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
              <option value="DATE">DATE</option>
              <option value="DATETIME">DATETIME</option>
              <option value="BOOLEAN">BOOLEAN</option>
              <option value="TEXT">TEXT</option>
            </select>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => removeColumn(i)}
              title="Remove column"
            >
             <div className="bi bi-trash-fill"></div>
            </button>
          </div>
        ))}

        <div className="d-flex gap-2 ">
          <button type="button" className="btn btn-dark" onClick={addColumn}>
            <div class="bi bi-plus-square">Add Column</div> 
          </button>
          <button type="submit" className="btn btn-dark" disabled={loading}>
            {loading ? "Creating..." : "Create New File"}
          </button>
        </div>
      </form>

      {/* {schema && (
        <div className="mt-4">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="mb-2">Table: {schema.tableName}</h4>
            <button className="btn btn-outline-secondary btn-sm" onClick={reloadSchema} disabled={loading}>
              {loading ? "Loading..." : "Refresh Schema"}
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Column</th>
                  <th>Type</th>
                  <th>Nullable</th>
                  <th>Key</th>
                  <th>Default</th>
                  <th>Extra</th>
                </tr>
              </thead>
              <tbody>
                {schema.columns.map((c, idx) => (
                  <tr key={c.name + idx}>
                    <td>{idx + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.type}</td>
                    <td>{c.nullable ? "YES" : "NO"}</td>
                    <td>{c.key || "-"}</td>
                    <td>{c.defaultValue ?? "-"}</td>
                    <td>{c.extra || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}
    </div>
  );
}
