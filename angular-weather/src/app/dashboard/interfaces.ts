export interface IRecord {
  cloudiness: {
    percent: number;
    type: number;
  };
  gm: number;
  humidity: number;
  icon: string;
  ph: number;
  precipitation: {
    amount: number | null;
    type: number;
    intensity: number;
  };
  pressure: number;
  radiation: {
    UVB: number | null;
    uvb_index: number | null;
  };
  storm: boolean;
  temp: {
    air: number | null;
    comfort: number | null;
  };
  text: string;
  wind: {
    degree: number;
    scale_8: number;
    speed: number;
  }
}

interface IDay {
  [key: string]: IRecord;
}

interface IMonth {
  [key: string]: IDay;
}

interface IYear {
  [key: string]: IMonth;
}

export interface IResponse {
  [key: string]: IYear;
}

export interface IChartData {
  year: string;
  month: string;
  day: string;
  yearData: IYear;
}
