
export interface StoredWidgetPlacement {
    id: string;
    columnOffset?: Record<number, number>;
    rowSpan?: number;
    columnSpan?: number;
  }

  export interface AwsService {
    name: string;
    description: string;
    link: string;
  }
  
  export interface AwsServiceCategory {
    category: string;
    services: AwsService[];
  }