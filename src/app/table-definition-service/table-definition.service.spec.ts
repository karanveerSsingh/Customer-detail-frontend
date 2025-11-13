import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { TableDefinitionService } from './table-definition.service';

// Setup function that's called at the start of each test
function setup() {
  // Configure TestBed
  TestBed.configureTestingModule({
    providers: [TableDefinitionService, DatePipe],
  });

  // Get service instance
  const service = TestBed.inject(TableDefinitionService);

  // Mock data for testing
  const mockRow = {
    id: 1,
    name: 'Test Name',
    date: new Date('2023-01-15'),
    status: 'Active',
    emptyDate: '',
    nullDate: null,
  };

  // Sample table definition data
  const basicDefinition = {
    key: 'name',
    dataKey: 'name',
    displayValue: 'Name',
    link: false,
    useLimitPipe: false,
    wordLimit: 0,
    permission: 'string',
  };

  // Sample render field configurations
  const dateRenderField = {
    renderFieldType: 'date',
    key: 'date',
    valueClass: [{ value: 'Active', cssClass: 'active-class' }],
    spanNum: 1,
  };

  const statusRenderField = {
    renderFieldType: 'status',
    key: 'status',
    valueClass: [
      { value: 'Active', cssClass: 'active-class' },
      { value: 'Inactive', cssClass: 'inactive-class' },
    ],
    spanNum: 1,
  };

  const doubleSpanRenderField = {
    renderFieldType: 'status',
    key: 'status',
    valueClass: [
      { value: 'Active', cssClass: 'dot-active' },
      { value: 'Inactive', cssClass: 'dot-inactive' },
    ],
    spanNum: 2,
  };

  const noMatchRenderField = {
    renderFieldType: 'status',
    key: 'status',
    valueClass: [{ value: 'Pending', cssClass: 'pending-class' }],
    spanNum: 1,
  };

  return {
    service,
    mockRow,
    basicDefinition,
    dateRenderField,
    statusRenderField,
    doubleSpanRenderField,
    noMatchRenderField,
  };
}

describe('TableDefinitionService', () => {
  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  it('should create a basic table definition with key and display value', () => {
    const { service } = setup();
    const result = service.tableDefinitions('name', 'Display Name');

    expect(result.key).toBe('name');
    expect(result.displayValue).toBe('Display Name');
    expect(result.link).toBe(false);
  });

  it('should create a table definition with link set to true', () => {
    const { service } = setup();
    const result = service.tableDefinitions('name', 'Display Name', true);

    expect(result.key).toBe('name');
    expect(result.displayValue).toBe('Display Name');
    expect(result.link).toBe(true);
  });

  it('should handle empty display value', () => {
    const { service } = setup();
    const result = service.tableDefinitions('name', '');

    expect(result.key).toBe('name');
    expect(result.displayValue).toBe('');
  });

  it('should add a date render function when renderFieldType is date', () => {
    const { service, dateRenderField } = setup();
    const result = service.tableDefinitions('date', 'Date Field', false, dateRenderField);

    expect(result.key).toBe('date');
    expect(result.render).toBeDefined();
    expect(typeof result.render).toBe('function');
  });

  it('should add a HTML render function when renderFieldType is date and renderField is provided', () => {
    const { service, dateRenderField } = setup();
    const result = service.tableDefinitions('date', 'Date Field', false, dateRenderField);

    expect(result.key).toBe('date');
    expect(result.render).toBeDefined();
    expect(typeof result.render).toBe('function');
  });

  it('should not add a render function when renderField is not provided', () => {
    const { service } = setup();
    const result = service.tableDefinitions('name', 'Name Field');

    expect(result.key).toBe('name');
    expect(result.render).toBeUndefined();
  });

  it('should not add a render function when renderFieldType is empty', () => {
    const { service } = setup();
    const emptyRenderField = {
      renderFieldType: '',
      key: 'date',
      valueClass: [{ value: 'Active', cssClass: 'active-class' }],
      spanNum: 1,
    };

    const result = service.tableDefinitions('date', 'Date Field', false, emptyRenderField);

    expect(result.key).toBe('date');
    expect(result.render).toBeUndefined();
  });

  it('should render a date correctly using renderDate', () => {
    const { service, mockRow } = setup();
    const renderFn = service.renderDate('date');
    const result = renderFn(mockRow);

    // Format should be dd-MMM-yyyy (e.g., "15-Jan-2023")
    expect(result).toContain('<span>');
    expect(result).toContain('15-Jan-2023');
  });

  it('should handle empty or null dates in renderDate', () => {
    const { service, mockRow } = setup();

    const emptyRenderFn = service.renderDate('emptyDate');
    const emptyResult = emptyRenderFn(mockRow);
    expect(emptyResult).toBe('<span></span>');

    const nullRenderFn = service.renderDate('nullDate');
    const nullResult = nullRenderFn(mockRow);
    expect(nullResult).toBe('<span></span>');
  });

  it('should render HTML with single span when spanNum is 1', () => {
    const { service, statusRenderField, mockRow } = setup();

    const renderFn = service.renderHtml(statusRenderField);
    const result = renderFn(mockRow);

    expect(result).toBe('<span class="active-class">Active</span>');
  });

  it('should render HTML with double span when spanNum is 2', () => {
    const { service, doubleSpanRenderField, mockRow } = setup();

    const renderFn = service.renderHtml(doubleSpanRenderField);
    const result = renderFn(mockRow);

    expect(result).toBe('<span><span class="dot-active"></span>Active</span>');
  });

  it('should render default HTML when no matching value is found', () => {
    const { service, noMatchRenderField, mockRow } = setup();

    const renderFn = service.renderHtml(noMatchRenderField);
    const result = renderFn(mockRow);

    expect(result).toBe('<span class="accessory-unknown">----</span>');
  });

  it('should return a copy of the provided definition in tableDefObject', () => {
    const { service, basicDefinition } = setup();

    const result = service.tableDefObject(basicDefinition);

    expect(result).toEqual(basicDefinition);
    expect(result).not.toBe(basicDefinition); // Should be a new object, not the same reference
  });
});
