import React, { useState, useEffect } from "react";

const Pagination = ({
    totalCount,
    dataLimit,
    currentPage = 1,
    setCurrentPage,
    afterPageChange,
    setSkip,
    skip,
}) => {
    const [pages, setPages] = useState(Math.ceil(totalCount / dataLimit));

    useEffect(() => {
        setPages(Math.ceil(totalCount / dataLimit));
    }, [totalCount, dataLimit]);

    const goToNextPage = () => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        afterPageChange && afterPageChange();
        setSkip(skip + dataLimit);
    };

    const goToPreviousPage = () => {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        afterPageChange && afterPageChange();
        setSkip(Math.max(0, skip - dataLimit));
    };

    return (
        <div className="pb-10 col-span-full mt-4 max-[700px]:w-[458px] max-[400px]:w-[458px]">
            <div className="flex items-center justify-end max-[700px]:w-[454px] max-[700px]:overflow-x-scroll max-sm:justify-start">
                <button
                    className={`px-4 py-1 mr-2 rounded-md ${currentPage === 1 ? "bg-[#ddd] text-gray-600 pointer-events-none cursor-default" : "hover:bg-[#ddd] border-1 text-gray-600 hover:bg-gray-200 cursor-pointer"}`}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className="px-3 py-1 mr-2 rounded-md bg-white text-gray-600">
                   {currentPage}  {''} {''}   of  {''} {''} {pages}
                </span>
                <button
                    className={`px-4 py-1 ml-2 rounded-md  ${currentPage === pages ? "bg-[#ddd] text-gray-600 pointer-events-none cursor-default" : "hover:bg-[#ddd] border-1 text-gray-600 hover:bg-gray-200 cursor-pointer"}`}
                    onClick={goToNextPage}
                    disabled={currentPage === pages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
