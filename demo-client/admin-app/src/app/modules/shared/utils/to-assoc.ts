export function toAssoc<T>(arg: any[]): T[]{
    const res: T[] = [];
    if(Array.isArray(arg)){
        for (const iterator of arg) {
            res[iterator.Id] = iterator;
        }
    }
    return res;
}