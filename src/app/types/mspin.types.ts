export interface MspinResponse {
  error: boolean;
  errors: null;
  data: MsPinData;
}

export interface MsPinData {
  mspin: string;
  firstName: string;
  lastName: string;
  employeeDepartmentCode: string;
  channelName: string;
  email: string;
  mobile: string;
  dealerMapCode: number;
  locationCode: string;
  channel: string;
  dealerType: string;
  dealerName: string;
  forCode: string;
  parentGroup: string;
  mulCode: string;
  outletCode: string;
  compFa: string;
  cityCode: string;
  stateCode: string;
  regionCd: string;
  parent?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  mspin_user_name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  designation_code: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  designation_desc: string;
}

export interface MspinRequest {
  mspin: number;
}

export interface UserAttribute {
  id: number;
  attribute: string;
  value: string;
  appName?: string;
  applicationId?: string;
}
