type KeyType = string | number;
type ObjectType = { [key in KeyType]?: any };

function groupBy<T extends ObjectType>(
    xs: T[],
    key: KeyType
): { [key: string]: T[] } {
    return xs.reduce(function (rv: { [key: string]: T[] }, x: T) {
        (rv[x[key as keyof T] as string] =
            rv[x[key as keyof T] as string] || []).push(x);
        return rv;
    }, {});
}

export default groupBy;
