/// <reference path="../lib/openrct2.d.ts" />

import { main } from "./main";
import { pluginVersion } from "./helpers/environment";


registerPlugin({
	name: "Litter Editor",
	version: pluginVersion,
	authors: ["Enox"],
	type: "local",
	licence: "MIT",
	targetApiVersion: 64,
	main,
});
