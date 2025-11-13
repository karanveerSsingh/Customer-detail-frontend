export interface PermissionData {
  id: number | null;
  key: string;
  name: string;
  active: boolean;
  description: string;
}

export interface PermissionsResponse {
  error: boolean;
  errors: null;
  data: PermissionData[];
}
