// // Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// // SPDX-License-Identifier: MIT-0
// import React from 'react';
// import BreadcrumbGroup, { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

// export function Breadcrumbs({ items }: { items: BreadcrumbGroupProps['items'] }) {
//   return (
//     <BreadcrumbGroup
//       items={[{ text: 'Service', href: '#' }, ...items]}
//       expandAriaLabel="Show path"
//       ariaLabel="Breadcrumbs"
//     />
//   );
// }

import React from 'react';
import BreadcrumbGroup, { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import { useNavigate } from 'react-router-dom';

export function Breadcrumbs({ items }: { items: BreadcrumbGroupProps['items'] }) {
    const navigate = useNavigate();

    const handleBreadcrumbClick = (href: string) => {
        if (href) {
            navigate(href); // Use navigate to route based on the href
        }
    };

    return (
        <BreadcrumbGroup
            items={items.map(item => ({
                ...item,
                onClick: () => handleBreadcrumbClick(item.href), // Add onClick handler to navigate
            }))}
            expandAriaLabel="Show path"
            ariaLabel="Breadcrumbs"
        />
    );
}

