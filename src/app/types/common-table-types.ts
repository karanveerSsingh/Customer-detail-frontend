import { TemplateRef } from '@angular/core';
export interface TableDefinition {
  order?: number;
  key: string;
  dataKey: string;
  displayValue: string;
  render?: (row: unknown) => string;
  tooltip?: boolean | ((row: unknown) => string);
  cellTemplate?: TemplateRef<unknown>;
  useLimitPipe?: boolean;
  wordLimit?: number;
  permission?: string;
  link?: boolean;
  cssClass?: string;
  disableSorting?: boolean;
}
