export const SETTINGS = {
  dashboard: {
    positionClassDefault: 'dashboard-row',
    positionClasses: ['dashboard-row', 'dashboard-column'],
  },
};

interface IMonth {
  [key: string]: string;
}
export const MONTHS = <IMonth>{
  '01': 'Январь',
  '02': 'Февраль',
  '03': 'Март',
  '04': 'Апрель',
  '05': 'Май',
  '06': 'Июнь',
  '07': 'Июль',
  '08': 'Август',
  '09': 'Сентябрь',
  '10': 'Октябрь',
  '11': 'Ноябрь',
  '12': 'Декабрь',
};
