import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { TableDefinition } from '../types/common-table-types';

@Injectable({
  providedIn: 'root',
})
export class TableDefinitionService {
  tableDefinitions<T>(
    key: string,
    displayValue: string,
    link?: boolean,
    renderField?: {
      renderFieldType: string;
      key: string;
      valueClass: { value: string; cssClass: string }[];
      spanNum: number;
    },
  ): TableDefinition {
    let defObj: TableDefinition = {} as unknown as TableDefinition;

    defObj = { ...defObj, key };
    if (
      typeof renderField?.renderFieldType === 'string' &&
      renderField?.renderFieldType.length > 0
    ) {
      if (renderField.renderFieldType === 'date') {
        defObj = { ...defObj, render: this.renderDate<T>(renderField.key as keyof T) };
      }
      if (renderField.renderFieldType === 'date' && renderField) {
        defObj = { ...defObj, render: this.renderHtml(renderField) };
      }
    }
    defObj = link ? { ...defObj, link: true } : { ...defObj, link: false };
    defObj =
      displayValue.length > 0 ? { ...defObj, displayValue } : { ...defObj, displayValue: '' };
    return defObj;
  }

  renderDate<T>(fieldName: keyof T) {
    return (row: unknown) => {
      const datePipe = new DatePipe('en-IN');
      const rawDate = (row as T)[fieldName];
      const formatted = rawDate ? datePipe.transform(rawDate as string | Date, 'dd-MMM-yyyy') : '';
      return `<span>${formatted}</span>`;
    };
  }

  renderHtml(renderField: {
    key: string;
    valueClass: { value: string; cssClass: string }[];
    spanNum: number;
  }) {
    return (row: unknown) => {
      const className = renderField.valueClass.find(
        item => item.value === (row as { [key: string]: unknown })[renderField.key],
      )?.cssClass;

      let htmlString: string;

      if (className && renderField.spanNum === 1) {
        htmlString = `<span class="${className}">${(row as { [key: string]: unknown })[renderField.key]}</span>`;
      } else if (className && renderField.spanNum === 2) {
        htmlString = `<span><span class="${className}"></span>${(row as { [key: string]: unknown })[renderField.key]}</span>`;
      } else {
        htmlString = `<span class="accessory-unknown">----</span>`;
      }
      return htmlString;
    };
  }

  tableDefObject(data: TableDefinition) {
    return { ...data };
  }
}
