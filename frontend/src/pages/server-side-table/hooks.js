// import { useEffect, useState } from 'react';

// const API_BASE_URL = 'http://localhost:8080/api/distributions';

// export function useDistributions(params = {}) {
//   const { pageSize = 10, currentPageIndex: clientPageIndex = 1 } = params.pagination || {};
//   const { sortingDescending = false, sortingColumn = { sortingField: 'id' } } = params.sorting || {};
//   const { filteringText = '' } = params.filtering || {};

//   const [loading, setLoading] = useState(true);
//   const [items, setItems] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPageIndex, setCurrentPageIndex] = useState(clientPageIndex);
//   const [pagesCount, setPagesCount] = useState(0);

//   useEffect(() => {
//     setCurrentPageIndex(clientPageIndex);
//   }, [clientPageIndex]);

//   useEffect(() => {
//     setLoading(true);

//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}?pageSize=${pageSize}&pageIndex=${currentPageIndex}&sortingColumn=${sortingColumn.sortingField}&sortingDescending=${sortingDescending}&filteringText=${filteringText}`
//         );
//         const data = await response.json();

//         // Set the response data or fallback to defaults
//         setLoading(false);
//         setItems(data.items || []); // Default to an empty array
//         setTotalCount(data.totalCount || 0); // Default to 0
//         setPagesCount(data.pagesCount || 0); // Default to 0
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [
//     pageSize,
//     sortingDescending,
//     sortingColumn,
//     currentPageIndex,
//     filteringText,
//   ]);

//   return {
//     items,
//     loading,
//     totalCount,
//     pagesCount,
//     currentPageIndex,
//   };
// }


import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:8080/api/distributions';

export function useDistributions(params = {}) {
  // Destructure pagination, sorting, and filtering params with defaults
  const { pageSize = 10, currentPageIndex: clientPageIndex = 1 } = params.pagination || {};
  const { sortingDescending = false, sortingColumn = { sortingField: 'id' } } = params.sorting || {};
  const { filteringText = '', filteringTokens = [], filteringOperation = 'AND' } = params.filtering || {};

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(clientPageIndex);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    setCurrentPageIndex(clientPageIndex);
  }, [clientPageIndex]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        // Construct the filtering parameters as needed
        const filterParams = new URLSearchParams({
          pageSize,
          pageIndex: currentPageIndex,
          sortingColumn: sortingColumn.sortingField,
          sortingDescending,
          filteringText,
          filteringOperation, // Add the filtering operation
        });

        // Add filtering tokens if available
        if (filteringTokens.length > 0) {
          filterParams.append('filteringTokens', filteringTokens.join(','));
        }

        // Make the API request with all necessary parameters
        const response = await fetch(`${API_BASE_URL}?${filterParams.toString()}`);
        const data = await response.json();

        // Handle the response data or fall back to defaults
        setLoading(false);
        setItems(data.items || []); // Default to an empty array
        setTotalCount(data.totalCount || 0); // Default to 0
        setPagesCount(data.pagesCount || 0); // Default to 0
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [
    pageSize,
    sortingDescending,
    sortingColumn,
    currentPageIndex,
    filteringText,
    filteringTokens,
    filteringOperation, // Add filtering dependencies
  ]);

  return {
    items,
    loading,
    totalCount,
    pagesCount,
    currentPageIndex,
  };
}
