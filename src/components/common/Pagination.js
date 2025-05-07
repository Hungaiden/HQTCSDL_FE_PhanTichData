import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../styles/components/pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button 
        className="pagination-btn prev"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FaChevronLeft />
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-btn next" 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
