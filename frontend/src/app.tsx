import React, { useRef, useState } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { Route, useLocation, Routes } from 'react-router-dom';
import SplitPanel from '@cloudscape-design/components/split-panel';
import { HelpPanelProvider } from './commons';
import { Breadcrumbs } from './commons/Breadcrumbs';
import { useLocalStorage } from './commons/use-local-storage';
import { DashboardMainInfo } from './dashboard/components/header';
import { CustomAppLayout } from './commons/common-components';
import { DashboardSideNavigation } from './dashboard/side-navigation';
import { getPaletteWidgets } from './widgets';
import Palette from './components/palette';
import { Instances } from './pages/Instance/Instances';
import { Tags } from './pages/Tag/Tags';
import { StoredWidgetPlacement } from './interfaces';
import { Content } from './pages/content';
import Event from './pages/server-side-table/from'
import CreateDistributionForm from './pages/server-side-table/from'
// Import TopNavigation and Notifications
import TopNavigation from './pages/non-console';
import { Notifications } from './notifications';
import Input from '@cloudscape-design/components/input';
import AwsServicesCategories from './pages/AwsServicesCategories'
const splitPanelMaxSize = 360;

// Dynamically generate breadcrumbs based on the current route
const useBreadcrumbs = () => {
  const location = useLocation();
  const path = location.pathname;

  switch (path) {
    case '/instances':
      return [{ text: 'Dashboard', href: '/' }, { text: 'Instances', href: '/instances' }];
    case '/tags':
      return [{ text: 'Dashboard', href: '/' }, { text: 'Tags', href: '/tags' }];
    case '/content':
      return [{ text: 'Dashboard', href: '/' }, { text: 'Content', href: '/content' }];
      case '/events':
        return [{ text: 'Dashboard', href: '/' }, { text: 'Event', href: '/events' }];
        case '/allservice':
        return [{ text: 'Dashboard', href: '/' }, { text: 'AwsServicesCategories', href: '/allservice' }];
    default:
      return [{ text: 'Dashboard', href: '/' }];
  }
};

export function App() {
  const appLayoutRef = useRef<AppLayoutProps.Ref>(null);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [splitPanelSize, setSplitPanelSize] = useLocalStorage('React-ConfigurableDashboard-SplitPanelSize', 360);
  const [layout, setLayout, resetLayout] = useLocalStorage<ReadonlyArray<StoredWidgetPlacement> | null>(
    'ConfigurableDashboards-widgets-layout',
    null
  );
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <DashboardMainInfo />);
  const [searchValue, setSearchValue] = useState('');

  const loadHelpPanelContent = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayoutRef.current?.focusToolsClose();
  };
  const i18nStrings = {
    searchIconAriaLabel: 'Search',
    searchDismissIconAriaLabel: 'Close search',
    overflowMenuTriggerText: 'More',
    overflowMenuTitleText: 'All',
    overflowMenuBackIconAriaLabel: 'Back',
    overflowMenuDismissIconAriaLabel: 'Close menu',
  };
  

  const breadcrumbs = useBreadcrumbs();

  return (
    <HelpPanelProvider value={loadHelpPanelContent}>
      <div className="flex flex-col h-screen">
        <TopNavigation
          search={
            <Input
              ariaLabel="Input field"
              clearAriaLabel="Clear"
              value={searchValue}
              type="search"
              placeholder="Search"
              onChange={({ detail }) => setSearchValue(detail.value)}
            />
          }
        />
        <div className="flex-grow overflow-hidden">
          <CustomAppLayout
            ref={appLayoutRef}
            contentType="dashboard"
            breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
            navigation={<DashboardSideNavigation />}
            notifications={<Notifications />}
            toolsOpen={toolsOpen}
            tools={toolsContent}
            onToolsChange={({ detail }) => setToolsOpen(detail.open)}
            content={
              <Routes>
                <Route path="/" element={
                  <Content
                    layout={layout}
                    setLayout={setLayout}
                    resetLayout={resetLayout}
                    setSplitPanelOpen={setSplitPanelOpen}
                  />
                } />
                <Route path="/instances" element={<Instances />} />
                <Route path="/tags" element={<Tags />} />
                <Route path="/events" element={<Event />} />
                <Route path="/allservice" element={<AwsServicesCategories />} />
                <Route path="/from" Component={CreateDistributionForm} />
                
                {/* Add more routes as needed */}
              </Routes>
            }
            splitPanel={
              <SplitPanel header="Add widgets" closeBehavior="hide" hidePreferencesButton={true}>
                <Palette items={getPaletteWidgets(layout ?? [])} />
              </SplitPanel>
            }
            splitPanelPreferences={{ position: 'side' }}
            splitPanelOpen={splitPanelOpen}
            onSplitPanelToggle={({ detail }) => setSplitPanelOpen(detail.open)}
            splitPanelSize={splitPanelSize}
            onSplitPanelResize={event => setSplitPanelSize(Math.min(event.detail.size, splitPanelMaxSize))}
          />
        </div>
      </div>
    </HelpPanelProvider>
  );
}