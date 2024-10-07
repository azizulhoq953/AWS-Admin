import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import { FullPageHeader } from '../../commons';
import { TableNoMatchState, TableEmptyState } from '../../commons/common-components';
import {
  distributionTableAriaLabels,
  getHeaderCounterText,
  getTextFilterCounterText,
  propertyFilterI18nStrings,
  renderAriaLive,
} from '../../i18n/i18n-strings';
import DataProvider from '../../commons/data-provider';
import { Preferences } from '../../commons/table-config';
import '../../styles/base.scss';

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Error suppression
const suppressResizeObserverError = () => {
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0]?.includes?.('ResizeObserver loop completed with undelivered notifications.')) {
      return;
    }
    originalError.apply(console, args);
  };
  return () => {
    console.error = originalError;
  };
};

export function PropertyFilterTable({
  loadHelpPanelContent,
  columnDefinitions,
  contentDisplayOptions,
  saveWidths,
  preferences,
  setPreferences,
  filteringProperties,
}) {
  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);

  const { items, actions, filteredItemsCount, collectionProps, paginationProps, propertyFilterProps } = useCollection(
    distributions,
    {
      propertyFiltering: {
        filteringProperties,
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: (
          <TableNoMatchState
            onClearFilter={() => {
              actions.setPropertyFiltering({ tokens: [], operation: 'and' });
            }}
          />
        ),
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  const fetchData = useCallback(async (pageIndex, pageSize) => {
    setLoading(true);
    try {
      const dataProvider = new DataProvider();
      const result = await dataProvider.getData('distributions', { pageIndex, pageSize });
      setDistributions(result.items);
      setTotalItems(result.totalCount);
      setCurrentPageIndex(result.pageIndex);
      setPagesCount(result.pagesCount);
    } catch (error) {
      console.error('Error fetching distributions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetchData = useCallback(debounce(fetchData, 300), [fetchData]);

  useLayoutEffect(() => {
    debouncedFetchData(currentPageIndex, preferences.pageSize);
  }, [currentPageIndex, preferences.pageSize, debouncedFetchData]);

  const handlePaginationChange = ({ detail }) => {
    setCurrentPageIndex(detail.currentPageIndex);
  };

  useEffect(() => {
    const cleanup = suppressResizeObserverError();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <Table
      {...collectionProps}
      enableKeyboardNavigation={true}
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={preferences.contentDisplay}
      ariaLabels={distributionTableAriaLabels}
      renderAriaLive={renderAriaLive}
      selectionType="multi"
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      stickyColumns={preferences.stickyColumns}
      onColumnWidthsChange={saveWidths}
      header={
        <FullPageHeader
          selectedItemsCount={collectionProps.selectedItems.length}
          counter={!loading && getHeaderCounterText(distributions, collectionProps.selectedItems)}
          onInfoLinkClick={loadHelpPanelContent}
        />
      }
      loading={loading}
      loadingText="Loading distributions"
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          i18nStrings={propertyFilterI18nStrings}
          countText={getTextFilterCounterText(filteredItemsCount)}
          expandToViewport={true}
          enableTokenGroups={true}
        />
      }
      pagination={
        <Pagination 
          currentPageIndex={currentPageIndex}
          onChange={handlePaginationChange}
          pagesCount={pagesCount}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: pageNumber =>
              `Page ${pageNumber} of all pages`
          }}
        />
      }
      preferences={
        <Preferences
          preferences={preferences}
          setPreferences={setPreferences}
          contentDisplayOptions={contentDisplayOptions}
        />
      }
    />
  );
}