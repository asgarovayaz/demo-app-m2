export interface ObjectConv {
  Id: number;
  Name: string;
}

export function enumToObject(numenum: any): ObjectConv[] {
  return Object.keys(numenum)
    .filter((v) => isNaN(Number(v)))
    .map((Name) => {
      return {
        Id: numenum[Name as keyof typeof numenum],
        Name,
      };
    });
}
