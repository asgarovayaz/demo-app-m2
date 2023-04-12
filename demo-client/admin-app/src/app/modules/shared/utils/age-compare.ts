import * as moment from "moment";

function checkAgeLowerThan(birthDate: string, age: number): boolean {
  if (moment().diff(birthDate, 'years') < age) {
    return true;
  }
  return false;
}

export default checkAgeLowerThan;
