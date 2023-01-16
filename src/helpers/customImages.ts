enum ImageMoniker {
    "pixelart"
}

type ImageStringNames = keyof typeof ImageMoniker;

const pngToBase64: Record<ImageStringNames, string> = {
    pixelart: " "
};

const imageMap: number[] = [];

type ImageData = {
    width: number;
    height: number;
    data: string;
};

/**
 * Call this function once to initialize the custom sprites, probably in your main.ts file
 */
export const initCustomSprites = (): void => {
    const images: ImageData[] = [
        { width: 16, height: 16, data: pngToBase64.pixelart },
    ];
    // allocate memory slots for each image
    const range = ui.imageManager.allocate(images.length);

    // populate the memory slots with the images
    if (range) {
        images.forEach((image, index) => {
            ui.imageManager.setPixelData(range.start + index, {
                type: "png",
                palette: "keep",
                data: image.data,
            });
            imageMap[index] = range.start + index;
        });
    }
};
/**
 * Put this function in for the value for the image in a widget, e.g.:
 *
 *{..., width: 19, height: 20, image: customImageFor("sBendLeft"), ... }
 */
 export const customImageFor = (image: ImageStringNames): number => {
    return imageMap[ImageMoniker[image]];
};