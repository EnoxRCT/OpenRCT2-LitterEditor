/* const z = 36;
                    createLitterLine(type, coords, z);
                    createLitterLine(type, coords, z+4);
                    createLitterLine(type, coords, z+8);
                    createLitterLine(type, coords, z+12);
                    createLitterLine(type, coords, z+16);
                    createLitterLine(type, coords, z+20);
                    createLitterLine(type, coords, z+24);
                    createLitterLine(type, coords, z+28);
                    createLitterLine(type, coords, z+32);
                    createLitterLine(type, coords, z+36);
                    createLitterLine(type, coords, z+40);
                    createLitterLine(type, coords, z+44);
                    createLitterLine(type, coords, z+48);
                }
            }
        })
    }
}

function createLitterLine(type: EntityType, coords: CoordsXY, z: number): void
{
	const c = 10;
    map.createEntity(type, {x: 61, y: coords.y -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-4 -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-8 -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-12 -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-16 -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-20 -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-24 -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-28 -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-32 -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-36 -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-40 -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-44 -c, z: z });
    map.createEntity(type, {x: 61, y: coords.y-48 -c, z: z });
} */