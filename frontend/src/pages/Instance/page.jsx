import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { useColumnWidths } from '../../commons/use-column-widths';
import { useLocalStorage } from '../../commons/use-local-storage';
import { Breadcrumbs, ToolsContent } from '../table/common-components';
import { CustomAppLayout, Navigation, Notifications } from '../../commons/common-components';
import { FILTERING_PROPERTIES } from './table-property-filter-config';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES } from '../../commons/table-config';
import { PropertyFilterTable } from './property-filter-table';
import '../../styles/base.scss';

// It's necessary to import a scss file or the build will fail

const AWSInstances = () => {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TablePropertyFilter-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('React-TablePropertyFilter-Preferences', DEFAULT_PREFERENCES);
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();
  

  return (
    <CustomAppLayout
    ref={appLayout}
    navigation={<Navigation activeHref="#/distributions" />}
    notifications={<Notifications successNotification={true} />}
    breadcrumbs={<Breadcrumbs />}
    content={
      <PropertyFilterTable
        loadHelpPanelContent={() => {
          setToolsOpen(true);
          appLayout.current?.focusToolsClose();
        }}
        columnDefinitions={columnDefinitions}
        saveWidths={saveWidths}
        preferences={preferences}
        setPreferences={setPreferences}
        filteringProperties={FILTERING_PROPERTIES}
      />
    }
    contentType="table"
    tools={<ToolsContent />}
    toolsOpen={toolsOpen}
    onToolsChange={({ detail }) => setToolsOpen(detail.open)}
    stickyNotifications={true}
  />
);
};

export default AWSInstances;


// import React, { useEffect, useRef, useState } from 'react';
// import { createRoot } from 'react-dom/client';

// import { useColumnWidths } from '../../commons/use-column-widths';
// import { useLocalStorage } from '../../commons/use-local-storage';
// import { Breadcrumbs, ToolsContent } from '../table/common-components';
// import { CustomAppLayout, Navigation, Notifications } from '../../commons/common-components';
// import { FILTERING_PROPERTIES } from './table-property-filter-config';
// import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES } from '../../commons/table-config';
// import { PropertyFilterTable } from './property-filter-table';
// import '../../styles/base.scss';

// const AWSInstances = () => {
//   const [columnDefinitions, saveWidths] = useColumnWidths('React-TablePropertyFilter-Widths', COLUMN_DEFINITIONS);
//   const [preferences, setPreferences] = useLocalStorage('React-TablePropertyFilter-Preferences', DEFAULT_PREFERENCES);
//   const [toolsOpen, setToolsOpen] = useState(false);
  
//   // State to hold fetched data
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const appLayout = useRef();

//   // Fetch data from backend API when component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       const API_BASE_URL = 'http://localhost:8080/api/distributions'; // Replace with your API URL
//       try {
//         const response = await fetch(API_BASE_URL);
//         if (!response.ok) {
//           throw new Error(`Error fetching data: ${response.statusText}`);
//         }
//         const result = await response.json();
//         setData(result); // Store fetched data in state
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array means this runs once on mount

//   return (
//     <CustomAppLayout
//       ref={appLayout}
//       navigation={<Navigation activeHref="#/distributions" />}
//       notifications={<Notifications successNotification={true} />}
//       breadcrumbs={<Breadcrumbs />}
//       content={
//         loading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div>Error: {error}</div>
//         ) : (
//           <PropertyFilterTable
//             loadHelpPanelContent={() => {
//               setToolsOpen(true);
//               appLayout.current?.focusToolsClose();
//             }}
//             columnDefinitions={columnDefinitions}
//             saveWidths={saveWidths}
//             preferences={preferences}
//             setPreferences={setPreferences}
//             filteringProperties={FILTERING_PROPERTIES}
//             data={data} // Pass the fetched data to PropertyFilterTable
//           />
//         )
//       }
//       contentType="table"
//       tools={<ToolsContent />}
//       toolsOpen={toolsOpen}
//       onToolsChange={({ detail }) => setToolsOpen(detail.open)}
//       stickyNotifications={true}
//     />
//   );
// };

// export default AWSInstances;
