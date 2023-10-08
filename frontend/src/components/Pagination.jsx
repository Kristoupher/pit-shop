import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, url }) => {
    currentPage = parseInt(currentPage);
    totalPages = parseInt(totalPages);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const ellipsis = <span className="pagination-link">...</span>;

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <Link
                        key={i}
                        to={`${url}${i}`}
                        className={`pagination-link ${currentPage === i ? 'active' : ''} ${currentPage === i ? 'disabled' : ''}`}
                    >
                        {i}
                    </Link>
                );
            }
        } else {
            for (let i = 1; i <= 3; i++) {
                pageNumbers.push(
                    <Link
                        key={i}
                        to={`${url}${i}`}
                        className={`pagination-link ${currentPage === i ? 'active' : ''}`}
                    >
                        {i}
                    </Link>
                );
            }

            if (currentPage <= totalPages - 3) {
                pageNumbers.push(ellipsis);
            }

            for (let i = totalPages - 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <Link
                        key={i}
                        to={`${url}${i}`}
                        className={`pagination-link ${currentPage === i ? 'active' : ''} ${currentPage === i ? 'disabled' : ''}`}
                    >
                        {i}
                    </Link>
                );
            }
        }

        return pageNumbers;
    };

    return (
        <div className={`pagination-container ${totalPages > 1 ? '' : 'none'}`} >
            <div className="pagination">
                <Link
                    to={`${url}${currentPage - 1}`}
                    className={`pagination-link nav ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    <ChevronLeft size={25} color="#fff" />
                </Link>
                {renderPageNumbers()}
                <Link
                    to={`${url}${currentPage + 1}`}
                    className={`pagination-link nav ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                    <ChevronRight size={25} color="#fff" />
                </Link>
            </div>
        </div>
    );
};

export default Pagination;
