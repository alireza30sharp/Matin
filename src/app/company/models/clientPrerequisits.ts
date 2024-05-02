export interface clientPrerequisitsInterface {
  cacheKey: string;
  cacheData: CacheDataInterface[];
}

export interface CacheDataInterface {
  parentId?: number;
  id?: number;
  name?: string;
  code?: number;
  desc?: string;
}

export enum cacheKeyEnum {
  cities = 'cities',
  barname = 'barname-types-access',
  companyStatusType = 'company-status-type',
  company_types = 'company-types',
}
