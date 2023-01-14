/**
 * A generic TileElement type that exposes element, index and coords at once.
 * Used extensively for finding specific tile elements (surface, footpath, track, etc.)
 */
export type TileElementItem<T extends TileElement> = {
    element: T,
    index: number,
    coords: CoordsXY
};

/**
 * Utility function to get all "surface" elements at a given coords.
 * Replace "surface" & "SurfaceElement" with any other TileElementType to get a different type of element.
 * e.g. could use "footpath" & "FootpathElement" to get all footpath elements at a given coords.
 */
export const getSurfaceElementsFromCoords = (coords: CoordsXY | CoordsXYZ | CoordsXYZD): TileElementItem<SurfaceElement>[] => {
    return getTileElements<SurfaceElement>("surface", { x: coords.x, y: coords.y });
};

/**
 * Utility function to get a specific type of TileElement at a given CoordsXY
 * @returns
 */
export const getTileElements = <T extends TileElement>(elementType: TileElementType, coords: CoordsXY): TileElementItem<T>[] => {
    // console.log(`Querying tile for ${elementType} elements at coords (${coords.x}, ${coords.y})`);

    // have to divide the mapCoords by 32 to get the tile coords
    const selectedTile = map.getTile(coords.x / 32, coords.y / 32);

    // filter and map to elements of the given type
    const reducedELements = selectedTile.elements.reduce<TileElementItem<T>[]>((filtered, el, index) => {
        if (el.type === elementType) {
            return filtered.concat({
                element: <T>el,
                index: index,
                coords
            });
        }
        return filtered;
    }, []);

    // console.log(`Query returned ${reducedELements.length} elements`);
    return reducedELements;
};

// usage example
const coords: CoordsXY = { x: 0, y: 0 }; // example coords
export const surfaceElements = getTileElements<SurfaceElement>("surface", coords);
export const oneSurfaceElementZValue = surfaceElements[0].element.baseZ; // here's what you're looking for