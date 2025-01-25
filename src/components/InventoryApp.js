import React, { useState } from "react";

function InventoryApp() {
  const [items, setItems] = useState([
    { id: 1, name: "Apples", category: "Fruit", quantity: 50 },
    { id: 2, name: "Bananas", category: "Fruit", quantity: 8 },
    { id: 3, name: "Carrots", category: "Vegetable", quantity: 30 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity) return;
    const itemWithId = { ...newItem, id: Date.now(), quantity: parseInt(newItem.quantity, 10) };
    setItems([...items, itemWithId]);
    setNewItem({ name: "", category: "", quantity: "" });
  };

  const handleEditItem = (id, field, value) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: field === "quantity" ? parseInt(value, 10) : value } : item
    );
    setItems(updatedItems);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems = filterCategory
    ? items.filter((item) => item.category.toLowerCase() === filterCategory.toLowerCase())
    : items;

  const sortedItems = filteredItems.sort((a, b) =>
    sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Inventory Management App</h1>

      {/* Add New Item Form */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Add New Item</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              />
            </div>
          </div>
          <button className="btn btn-success mt-3" onClick={handleAddItem}>
            Add Item
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Inventory</span>
          <div className="d-flex gap-2">
            <select
              className="form-select"
              onChange={(e) => setFilterCategory(e.target.value)}
              defaultValue=""
            >
              <option value="">All Categories</option>
              <option value="Fruit">Fruit</option>
              <option value="Vegetable">Vegetable</option>
            </select>
            <button
              className="btn btn-secondary"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              Sort by Quantity ({sortOrder})
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((item) => (
                <tr key={item.id} className={item.quantity < 10 ? "table-danger" : ""}>
                  <td>
                    <input
                      className="form-control"
                      value={item.name}
                      onChange={(e) => handleEditItem(item.id, "name", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      value={item.category}
                      onChange={(e) => handleEditItem(item.id, "category", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleEditItem(item.id, "quantity", e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InventoryApp;
