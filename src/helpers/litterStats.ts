export function totalLitterCount(): string
{
    const allLitter = map.getAllEntities("litter");
    const totalLitter = allLitter.length;
    return totalLitter.toString();
}

export function litterCount(litterType: LitterType): string
{
    const allLitter = map.getAllEntities("litter");
    let litterCount: number = 0;
    allLitter.forEach(litter =>
        {
        if (litter.litterType === litterType)
        {
            litterCount++;
        }
    }
    )    
    return litterCount.toString();
}