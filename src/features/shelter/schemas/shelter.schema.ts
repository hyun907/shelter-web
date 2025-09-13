export type NearbyShelterApiItem = {
  distance: number;
  REARE_NM: string;
  SNDY_OPER_BGNG_HR: string;
  MDFCN_HR: string;
  RONA_DADDR: string;
  LHLDY_OPER_END_HR: string;
  DADDR: string;
  UTZTN_PSBLTY_TNOP: number;
  WKDY_OPER_BGNG_HR: string;
  STDY_OPER_END_HR: string;
  SNDY_OPER_END_HR: string;
  FCLT_TYPE: string;
  FCLTY_SCLAS: string;
  REARE_FCLT_NO: number;
  LOT: number;
  LAT: number;
  STDY_OPER_BGNG_HR: string;
  RMRK: string;
  LHLDY_OPER_BGNG_HR: string;
  WKDY_OPER_END_HR: string;
};

export type NearbyShelterApiResponse = NearbyShelterApiItem[];
