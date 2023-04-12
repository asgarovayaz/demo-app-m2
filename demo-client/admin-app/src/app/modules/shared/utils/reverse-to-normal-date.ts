function reverseToNormalDateString(date: string | undefined): string | undefined {
  if(date){
    const split = date.split('-');

    if(split[2].length !== 4)
    return date;

    return `${split[2]}-${split[1]}-${split[0]}`
  }
  return undefined;
}

export default reverseToNormalDateString;
