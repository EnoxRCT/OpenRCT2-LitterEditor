import { isUiAvailable } from "./helpers/environment";
import { debug } from "./helpers/logger";
import { LitterEditorWindow } from "./ui/window";


const window = new LitterEditorWindow();


/**
 * Entry point of the plugin.
 */
export function main(): void
{
	debug("Plugin started.");

	if (!isUiAvailable || network.mode != "none")
	{
		return;
	}

	ui.registerMenuItem("Litter Editor", () => window.open());
}
