function reverseToNormalDateStringNull(date: string | null): string | null {
  if(date){
    const split = date.split('-');

    if(split[2].length !== 4)
    return date;

    return `${split[2]}-${split[1]}-${split[0]}`
  }
  return null;
}

export default reverseToNormalDateStringNull;
