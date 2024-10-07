// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// import React from 'react';
// import { Button, Header, HeaderProps, SpaceBetween } from '@cloudscape-design/components';
// import { InfoLink } from './info-link';

// interface FullPageHeaderProps extends HeaderProps {
//   title?: string;
//   createButtonText?: string;
//   extraActions?: React.ReactNode;
//   selectedItemsCount: number;
//   onInfoLinkClick?: () => void;
// }

// export function FullPageHeader({
//   title = 'Distributions',
//   createButtonText = 'Create distribution',
//   extraActions = null,
//   selectedItemsCount,
//   onInfoLinkClick,
//   ...props
// }: FullPageHeaderProps) {
//   const isOnlyOneSelected = selectedItemsCount === 1;

//   return (
//     <Header
//       variant="awsui-h1-sticky"
//       info={onInfoLinkClick && <InfoLink onFollow={onInfoLinkClick} />}
//       actions={
//         <SpaceBetween size="xs" direction="horizontal">
//           {extraActions}
//           <Button data-testid="header-btn-view-details" disabled={!isOnlyOneSelected}>
//             View details
//           </Button>
//           <Button data-testid="header-btn-edit" disabled={!isOnlyOneSelected}>
//             Edit
//           </Button>
//           <Button data-testid="header-btn-delete" disabled={selectedItemsCount === 0}>
//             Delete
//           </Button>
//           <Button data-testid="header-btn-create" variant="primary">
//             {createButtonText}
//           </Button>
//         </SpaceBetween>
//       }
//       {...props}
//     >
//       {title}
//     </Header>
//   );
// }


import React from 'react';
import { Button, Header, HeaderProps, SpaceBetween } from '@cloudscape-design/components';
import { InfoLink } from './info-link'; // Adjust the import according to your file structure
import { useNavigate } from 'react-router-dom'; // For React Router
// import { useRouter } from 'next/router'; // Uncomment this line if using Next.js

interface FullPageHeaderProps extends HeaderProps {
  title?: string;
  createButtonText?: string;
  extraActions?: React.ReactNode;
  selectedItemsCount: number;
  onInfoLinkClick?: () => void;
}

export function FullPageHeader({
  title = 'Instance',
  createButtonText = 'Create instance',
  extraActions = null,
  selectedItemsCount,
  onInfoLinkClick,
  ...props
}: FullPageHeaderProps) {
  const isOnlyOneSelected = selectedItemsCount === 1;
  
  // Use navigate for React Router
  const navigate = useNavigate(); // For React Router

  // Use router for Next.js
  // const router = useRouter(); // Uncomment this line if using Next.js

  const handleCreateClick = () => {
    navigate('/create-distribution'); // For React Router
    // router.push('/create-distribution'); // Uncomment this line if using Next.js
  };

  return (
    <Header
      variant="awsui-h1-sticky"
      info={onInfoLinkClick && <InfoLink onFollow={onInfoLinkClick} />}
      actions={
        <SpaceBetween size="xs" direction="horizontal">
          {extraActions}
          <Button data-testid="header-btn-view-details" disabled={!isOnlyOneSelected}>
            View details
          </Button>
          <Button data-testid="header-btn-edit" disabled={!isOnlyOneSelected}>
            Edit
          </Button>
          <Button data-testid="header-btn-delete" disabled={selectedItemsCount === 0}>
            Delete
          </Button>
          <Button 
            data-testid="header-btn-create" 
            variant="primary" 
            onClick={handleCreateClick} // Attach the click handler
          >
            {createButtonText}
          </Button>
        </SpaceBetween>
      }
      {...props}
    >
      {title}
    </Header>
  );
}
