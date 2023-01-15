
import { debug } from "../helpers/logger";
import { isDevelopment, pluginVersion } from "../helpers/environment";
import { getTileElements } from "../helpers/Z-Coords";

// Settings for the window
export const windowId = "litter-editor-window";

const windowColour = 12;
const widgetLineHeight = 14;
const buttonPipette: string = "litter-editor-button-pipette";
const toolSelectLitter: string = "litter-editor-tool-select-litter";
const litterTypeDropDown: string = "litter-editor-litter-type-drop-down";
const litterTypeLabel: string = "litter-editor-litter-type-label";
const buttonDelete: string = "litter-editor-button-delete";
const toolRemoveLitter: string = "litter-editor-tool-remove-litter";
const xPositionLabel: string = "litter-editor-x-position-label";
const yPositionLabel: string = "litter-editor-y-position-label";
const zPositionLabel: string = "litter-editor-z-position-label";
const xPositionSpinner: string = "litter-editor-x-position-spinner";
const yPositionSpinner: string = "litter-editor-y-position-spinner";
const zPositionSpinner: string = "litter-editor-z-position-spinner";
const litterViewport: string = "litter-editor-litter-viewport";
const multiplierDropdown: string = "litter-editor-multiplier-drop-down";
const buttonCreateLitter: string = "litter-editor-button-create-litter";
const multiplierIndex: string[] = ["x1", "x10", "x100"];
const multiplierLabel: string = "litter-editor-multiplier-label";
const toolCreateLitter: string = "litter-editor-tool-create-litter";

let idLitter: Litter;
let multiplier: number = 1;
let selectedLitterType: LitterType = "vomit";

export class LitterEditorWindow {
	/**
	 * Opens the window for the Litter Editor.
	 */

	open(): void {
		const window = ui.getWindow(windowId);
		if (window) {
			debug("The Litter Editor window is already shown.");
			window.bringToFront();
		}
		else {
			let windowTitle = `Litter Editor (v${pluginVersion})`;
			if (isDevelopment) {
				windowTitle += " [DEBUG]";
			}
			ui.openWindow({
				onClose: () => {
					ui.tool?.cancel();
				},
				classification: windowId,
				title: windowTitle,
				width: 260,
				height: 250,
				colours: [windowColour, windowColour],
				tabs: [
					{
						image: 5478, //litter bin
						widgets: [
							<LabelWidget>{
								type: "label",
								x: 0,
								y: 232,
								width: 260,
								height: widgetLineHeight,
								textAlign: "centred",
								text: "github.com/EnoxRCT/OpenRCT2-LitterEditor",
								tooltip: "Powered by Manticore_007 and Basssiiie",
								isDisabled: true,
							},
							<GroupBoxWidget>{
								type: "groupbox",
								x: 10,
								y: 55,
								width: 240,
								height: 170,
								text: "Litter",
							},
							<ButtonDesc>{
								name: buttonPipette,
								type: "button",
								border: true,
								tooltip: "Select litter",
								x: 20,
								y: 75,
								width:25,
								height: 25,
								image: 29402, //pipette
								isPressed: false,
								onClick: () => selectLitter("litter")				
							},
							<ButtonDesc>{
								name: buttonDelete,
								type: "button",
								border: true,
								tooltip: "Remove litter",
								x: 80,
								y: 75,
								width: 25,
								height: 25,
								image: 5165, //litter bin
								isPressed: false,
								onClick: () => removeLitter("litter")
							},
							<ButtonDesc>{
								name: buttonCreateLitter,
								type: "button",
								border: true,
								tooltip: "Place litter",
								x: 50,
								y: 75,
								width: 25,
								height: 25,
								image: 5173, //paint brush
								isPressed: false,
								onClick: () => createLitter("litter")
							},
							<LabelWidget>{
								name: litterTypeLabel,
								type: "label",
								x: 20,
								y: 110,
								width: 75,
								height: widgetLineHeight,
								text: "Litter Type",
								isDisabled: true,
							},
							<DropdownDesc>{
								name: litterTypeDropDown,
								type: "dropdown",
								x: 90,
								y: 110,
								width: 125,
								height: widgetLineHeight,
								items: [
									"Vomit",				//0
									"Vomit Alt",			//1
									"Empty Can",			//2
									"Rubbish",				//3
									"Burger Box",			//4
									"Empty Cup",			//5
									"Empty Box",			//6
									"Empty Bottle",			//7
									"Empty Bowl Red",		//8
									"Empty Drink Carton",	//9
									"Empty Juice Cup",		//10
									"Empty Bowl Blue"		//11
								],
								selectedIndex: -1,
								isDisabled: true,
								onChange: (number) => setLitter(number)
							},
							
							<LabelWidget>{
								name: xPositionLabel,
								type: "label",
								x: 20,
								y: 135,
								width: 125,
								height: widgetLineHeight,
								text: "X-Position",
								isDisabled: true,
							},
							<SpinnerDesc>{
								name: xPositionSpinner,
								type: "spinner",
								x: 90,
								y: 135,
								width: 70,
								height: widgetLineHeight,
								text: " ",
								isDisabled: true,
								onIncrement: () => increase(xPositionSpinner, "x"),
								onDecrement: () => decrease(xPositionSpinner, "x"),
							},
							<LabelWidget>{
								name: yPositionLabel,
								type: "label",
								x: 20,
								y: 153,
								width: 125,
								height: widgetLineHeight,
								text: "Y-Position",
								isDisabled: true,
							},
							<SpinnerDesc>{
								name: yPositionSpinner,
								type: "spinner",
								x: 90,
								y: 153,
								width: 70,
								height: widgetLineHeight,
								text: " ",
								isDisabled: true,
								onIncrement: () => increase(yPositionSpinner, "y"),
								onDecrement: () => decrease(yPositionSpinner, "y"),
							},
							<LabelWidget>{
								name: zPositionLabel,
								type: "label",
								x: 20,
								y: 171,
								width: 125,
								height: widgetLineHeight,
								text: "Z-Position",
								isDisabled: true,
							},
							<SpinnerDesc>{
								name: zPositionSpinner,
								type: "spinner",
								x: 90,
								y: 171,
								width: 70,
								height: widgetLineHeight,
								text: " ",
								isDisabled: true,
								onIncrement: () => increase(zPositionSpinner, "z"),
								onDecrement: () => decrease(zPositionSpinner, "z"),
							},
							<LabelWidget>{
								name: multiplierLabel,
								type: "label",
								x: 20,
								y: 196,
								width: 125,
								height: widgetLineHeight,
								text: "Multiplier",
								isDisabled: true,
							},
							<DropdownDesc>{
								name: multiplierDropdown,
								type: "dropdown",
								x: 90,
								y: 196,
								width: 70,
								height: widgetLineHeight,
								items: multiplierIndex,
								selectedIndex: 0,
								isDisabled: true,
								onChange: (number) => setMultiplier(number)
							},
							<ViewportDesc>{
								name: litterViewport,
								type: "viewport",
								x: 165,
								y: 135,
								width: 75,
								height: 75,
							}
						],
					},
					{
						image: {
							frameBase: 5395, //stas
							frameCount: 12,
							frameDuration: 4,
						},
						widgets: [
							<LabelWidget>{
								type: "label",
								x: 0,
								y: 232,
								width: 260,
								height: widgetLineHeight,
								textAlign: "centred",
								text: "github.com/EnoxRCT/OpenRCT2-LitterEditor",
								tooltip: "Powered by Manticore_007 and Basssiiie",
								isDisabled: true,
							},
							<GroupBoxWidget>{
								type: "groupbox",
								x: 10,
								y: 55,
								width: 240,
								height: 170,
								text: "Stats",
							},
							<LabelWidget>{
								type: "label",
								x: 20,
								y: 120,
								width: 220,
								height: widgetLineHeight,
								textAlign: "centred",
								text: "Under development",
							},
						],
					},
					{
						image: {
							frameBase: 5367, //info
							frameCount: 8,
							frameDuration: 4,
						},
						widgets: [
							<LabelWidget>{
								type: "label",
								x: 0,
								y: 232,
								width: 260,
								height: widgetLineHeight,
								textAlign: "centred",
								text: "github.com/EnoxRCT/OpenRCT2-LitterEditor",
								tooltip: "Powered by Manticore_007 and Basssiiie",
								isDisabled: true,
							},
							<GroupBoxWidget>{
								type: "groupbox",
								x: 10,
								y: 55,
								width: 240,
								height: 170,
								text: "Info",
							},
							<LabelWidget>{
								type: "label",
								x: 20,
								y: 120,
								width: 220,
								height: widgetLineHeight,
								textAlign: "centred",
								text: "This LitterEditor is my first expierence with coding.\n\nSpecial thanks to:\nManticore_007, Basssiiie, Smitty\nand Gymnasiast.",
							},
						],
					}
				],
			});
		}
	}
}
function selectLitter(type: EntityType): void {
	const window = ui.getWindow(windowId);
	if (!window) {
		return;
	}
	const buttonPicker = window.findWidget<ButtonWidget>(buttonPipette);
	const deleteButton = window.findWidget<ButtonWidget>(buttonDelete);
	const createLitterButton = window.findWidget<ButtonWidget>(buttonCreateLitter);
	const dropDownType = window.findWidget<DropdownWidget>(litterTypeDropDown);
	const multiplier = window.findWidget<DropdownWidget>(multiplierDropdown);
	const labelMultiplier = window.findWidget<LabelWidget>(multiplierLabel);
	const xPosition = window.findWidget<SpinnerWidget>(xPositionSpinner);
	const yPosition = window.findWidget<SpinnerWidget>(yPositionSpinner);
	const zPosition = window.findWidget<SpinnerWidget>(zPositionSpinner);
	const labelLitterType = window.findWidget<LabelWidget>(litterTypeLabel);
	const xLabel = window.findWidget<LabelWidget>(xPositionLabel);
	const yLabel = window.findWidget<LabelWidget>(yPositionLabel);
	const zLabel = window.findWidget<LabelWidget>(zPositionLabel);
	if (buttonPicker.isPressed !== false) {
		buttonPicker.isPressed = false;
		ui.tool?.cancel();
	}
	else {
		buttonPicker.isPressed = true;
		deleteButton.isPressed = false;
		createLitterButton.isPressed = false;
		ui.activateTool(
			{
				id: toolSelectLitter,
				cursor: "cross_hair",
				filter: ["entity"],
				onDown: e => {
					if (e.entityId !== undefined) {
						debug(`Entity ID: ${e.entityId}`);
						const entity = map.getEntity(e.entityId);
						const litter = <Litter>entity;
						idLitter = litter;
						if (!entity || entity.type !== type) {
							ui.showError("WARNING:", "This is not litter!");
							window.findWidget<DropdownWidget>(litterTypeDropDown).text = " ";
						}
						else {
							getLitter(litter.litterType);
							window.findWidget<ButtonWidget>(buttonPipette).isPressed = false;
							dropDownType.isDisabled = false;
							multiplier.isDisabled = false;
							labelMultiplier.isDisabled = false;
							labelLitterType.isDisabled = false;
							xPosition.isDisabled = false;
							yPosition.isDisabled = false;
							zPosition.isDisabled = false;
							xLabel.isDisabled = false;
							yLabel.isDisabled = false;
							zLabel.isDisabled = false;
							ui.tool?.cancel();
							getLitterCoords(litter);
							window.findWidget<ViewportWidget>(litterViewport).viewport.moveTo(litter);
						}
					}
				},
			});
	}
}
//Changes the litterType.

function setLitter(number: number): void {
	const window = ui.getWindow(windowId);
	const createLitterButton = window.findWidget<ButtonWidget>(buttonCreateLitter);
	const litterTypeList: LitterType[] = ["vomit", "vomit_alt", "empty_can", "rubbish", "burger_box", "empty_cup", "empty_box", "empty_bottle", "empty_bowl_red", "empty_drink_carton", "empty_juice_cup", "empty_bowl_blue"];
	if (idLitter && !createLitterButton.isPressed){idLitter.litterType = litterTypeList[number];}
	else {selectedLitterType = litterTypeList[number]; debug("littertype set");}
}
//Changes the name in the DropDownDesc.

function getLitter(type: LitterType): void {
	const window = ui.getWindow(windowId);
	const litterTypeNumber = ["vomit", "vomit_alt", "empty_can", "rubbish", "burger_box", "empty_cup", "empty_box", "empty_bottle", "empty_bowl_red", "empty_drink_carton", "empty_juice_cup", "empty_bowl_blue"];
	if (window) {
		const dropDownLitterType = window.findWidget<DropdownWidget>(litterTypeDropDown);
		if (dropDownLitterType.items !== undefined) {
			dropDownLitterType.selectedIndex = litterTypeNumber.indexOf(type);
		}
	}
}
//Remove litter.

function removeLitter(type: EntityType): void {
	const window =ui.getWindow(windowId);
	if (!window) {
		return;
	}
	const deleteButton = window.findWidget<ButtonWidget>(buttonDelete);
	const buttonPicker = window.findWidget<ButtonWidget>(buttonPipette);
	const createLitterButton = window.findWidget<ButtonWidget>(buttonCreateLitter);
	const multiplier = window.findWidget<DropdownWidget>(multiplierDropdown);
	const labelMultiplier = window.findWidget<LabelWidget>(multiplierLabel);
	const dropDownType = window.findWidget<DropdownWidget>(litterTypeDropDown);
	const xPosition = window.findWidget<SpinnerWidget>(xPositionSpinner);
	const yPosition = window.findWidget<SpinnerWidget>(yPositionSpinner);
	const zPosition = window.findWidget<SpinnerWidget>(zPositionSpinner);
	const labelLitterType = window.findWidget<LabelWidget>(litterTypeLabel);
	const xLabel = window.findWidget<LabelWidget>(xPositionLabel);
	const yLabel = window.findWidget<LabelWidget>(yPositionLabel);
	const zLabel = window.findWidget<LabelWidget>(zPositionLabel);
	if (deleteButton.isPressed !== false) {
		deleteButton.isPressed = false;
		ui.tool?.cancel();
	}
	else {
		deleteButton.isPressed = true;
		buttonPicker.isPressed = false;
		createLitterButton.isPressed = false;
		dropDownType.isDisabled = true;
		multiplier.isDisabled = true;
		labelMultiplier.isDisabled = true;
		labelLitterType.isDisabled = true;
		xPosition.isDisabled = true;
		yPosition.isDisabled = true;
		zPosition.isDisabled = true;
		xLabel.isDisabled = true;
		yLabel.isDisabled = true;
		zLabel.isDisabled = true;
		dropDownType.text = " ";
		xPosition.text = " ";
		yPosition.text = " ";
		zPosition.text = " ";
		ui.getWindow(windowId).findWidget<ViewportWidget>(litterViewport).viewport.moveTo({x: -9000, y: -9000});
		ui.activateTool(
			{
				id: toolRemoveLitter,
				cursor: "bin_down",
				filter: ["entity"],
				onDown: e => {
					if (e.entityId !== undefined) {
						debug(`Entity ID: ${e.entityId}`);
						const entity = map.getEntity(e.entityId);
						const litter = <Litter>entity;
						idLitter = litter;
						if (!entity || entity.type !== type) {
							ui.showError("WARNING:", "This is not litter!");
						}
						else {
							litter.remove();
						}
					}
				}
			}
		);
	}
}
function getLitterCoords(litterCoords: CoordsXYZ): void {
	const window = ui.getWindow(windowId);
	if (window) {
		window.findWidget<SpinnerWidget>(xPositionSpinner).text = litterCoords.x.toString();
		window.findWidget<SpinnerWidget>(yPositionSpinner).text = litterCoords.y.toString();
		window.findWidget<SpinnerWidget>(zPositionSpinner).text = litterCoords.z.toString();
	}
}
function increase(spinner: string, axis: keyof CoordsXYZ): void {
	const widget = ui.getWindow(windowId).findWidget<SpinnerWidget>(spinner);
	idLitter[axis] = idLitter[axis] +1 * multiplier;
	widget.text = idLitter[axis].toString();
	ui.getWindow(windowId).findWidget<ViewportWidget>(litterViewport).viewport.moveTo(idLitter);
}
function decrease(spinner: string, axis: keyof CoordsXYZ): void {
	const widget = ui.getWindow(windowId).findWidget<SpinnerWidget>(spinner);
	idLitter[axis] = idLitter[axis] -1 * multiplier;
	widget.text = idLitter[axis].toString();
	ui.getWindow(windowId).findWidget<ViewportWidget>(litterViewport).viewport.moveTo(idLitter);
}
function setMultiplier(number: number): void {
	if (number === 0) {multiplier = 1;}
	if (number === 1) {multiplier = 10;}
	if (number === 2) {multiplier = 100;}
}
//Create litter

function createLitter(type: EntityType): void {
	const window =ui.getWindow(windowId);
	if (!window) {
		return;
	}
	const createLitterButton = window.findWidget<ButtonWidget>(buttonCreateLitter);
	const deleteButton = window.findWidget<ButtonWidget>(buttonDelete);
	const buttonPicker = window.findWidget<ButtonWidget>(buttonPipette);
	const multiplier = window.findWidget<DropdownWidget>(multiplierDropdown);
	const labelMultiplier = window.findWidget<LabelWidget>(multiplierLabel);
	const dropDownType = window.findWidget<DropdownWidget>(litterTypeDropDown);
	const xPosition = window.findWidget<SpinnerWidget>(xPositionSpinner);
	const yPosition = window.findWidget<SpinnerWidget>(yPositionSpinner);
	const zPosition = window.findWidget<SpinnerWidget>(zPositionSpinner);
	const labelLitterType = window.findWidget<LabelWidget>(litterTypeLabel);
	const xLabel = window.findWidget<LabelWidget>(xPositionLabel);
	const yLabel = window.findWidget<LabelWidget>(yPositionLabel);
	const zLabel = window.findWidget<LabelWidget>(zPositionLabel);
	if (createLitterButton.isPressed !== false) {
		createLitterButton.isPressed = false;
		dropDownType.isDisabled = true;
		labelLitterType.isDisabled = true;
		dropDownType.text = " ";
		ui.tool?.cancel();
	}
	else {
		createLitterButton.isPressed = true;
		buttonPicker.isPressed = false;
		deleteButton.isPressed = false;
		dropDownType.isDisabled = false;
		multiplier.isDisabled = true;
		labelMultiplier.isDisabled = true;
		labelLitterType.isDisabled = false;
		xPosition.isDisabled = true;
		yPosition.isDisabled = true;
		zPosition.isDisabled = true;
		xLabel.isDisabled = true;
		yLabel.isDisabled = true;
		zLabel.isDisabled = true;
		dropDownType.selectedIndex = 0;
		xPosition.text = " ";
		yPosition.text = " ";
		zPosition.text = " ";
		const window = ui.getWindow(windowId);
		const widget = window.findWidget<ViewportWidget>(litterViewport);
		widget.viewport.moveTo({x: -9000, y: -9000});
		ui.activateTool({
			id: toolCreateLitter,
			cursor: "cross_hair",
			filter: ["terrain"],
			onDown: e => {
				if (e.mapCoords !== undefined) {
					debug(`Create litter: ${e.mapCoords}`);
					const axisCoords = e.mapCoords;
					const surfaceElements = getTileElements("surface", axisCoords);
					const oneSurfaceElementZValue = surfaceElements[0].element.baseZ;
					const createdEntity = map.createEntity(type, {x: axisCoords.x, y: axisCoords.y, z: oneSurfaceElementZValue });
					const createdLitter = <Litter>createdEntity;
					createdLitter.litterType = selectedLitterType;
				}
			}
		});
	}
}

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
	const c = 9;
    map.createEntity(type, {x: coords.x -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-4 -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-8 -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-12 -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-16 -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-20 -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-24 -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-28 -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-32 -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-36 -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-40 -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-44 -c, y: 642, z: z });
    map.createEntity(type, {x: coords.x-48 -c, y: 642, z: z });
	
} */