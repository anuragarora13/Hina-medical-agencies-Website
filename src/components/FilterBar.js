import React from 'react';
import './FilterBar.css'
const FilterBar = ({ searchTerm, onSearch, selectedType, onTypeChange, typeOptions }) => {
    return (
        <div className="filter-bar">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
            />
            <select value={selectedType} onChange={(e) => onTypeChange(e.target.value)}>
                <option value="">All Types</option>
                {typeOptions.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>
        </div>
    );
};

export default FilterBar;
