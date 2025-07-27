import React, { useState, useEffect, useCallback } from 'react';
import Papa from 'papaparse';
import FilterBar from './FilterBar';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        Papa.parse('/products.csv', {
            download: true,
            header: true,
            complete: (result) => {
                setProducts(result.data);
            }
        });
    }, []);

    // 🔍 Filtering
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === '' || product.type === selectedType;
        return matchesSearch && matchesType;
    });

    // 📃 Pagination
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // ✅ useCallback to avoid re-render blinking
    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
        setCurrentPage(1); // optional: reset to page 1 on search
    }, []);

    const handleTypeChange = useCallback((type) => {
        setSelectedType(type);
        setCurrentPage(1); // optional: reset to page 1 on filter
    }, []);

    const uniqueTypes = [...new Set(products.map(p => p.type).filter(Boolean))];

    return (
        <div className="products-page">
            <h1 className="products-heading">Our Products</h1>

            <div className="filter-wrapper">
                <FilterBar
                    searchTerm={searchTerm}
                    onSearch={handleSearch}
                    selectedType={selectedType}
                    onTypeChange={handleTypeChange}
                    typeOptions={uniqueTypes}
                />
            </div>

            <div className="products-grid">
                {currentProducts.map((product, index) => (
                    <div className="product-card" key={index}>
                        <h2>{product.name}</h2>
                        <p><strong>Company:</strong> {product.company}</p>
                        <p><strong>Strength:</strong> {product.strength}</p>
                        <p><strong>Pack Size:</strong> {product.packSize}</p>
                        <p><strong>Type:</strong> {product.type}</p>
                        {product.whatsappLink && (
                            <a
                                className="whatsapp-btn"
                                href={product.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                📦 Order via WhatsApp
                            </a>
                        )}
                    </div>
                ))}
            </div>

            <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={currentPage === i + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Products;
