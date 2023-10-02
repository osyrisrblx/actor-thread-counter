import { Players, RunService, ServerScriptService } from "@rbxts/services";

const templates = script.WaitForChild("templates");
const serverExecutorTemplate = templates.WaitForChild("ServerExecutor") as Script;
const clientExecutorTemplate = templates.WaitForChild("ClientExecutor") as LocalScript;

const ACTOR_FOLDER_NAME = "DirectorActors";

function getOrCreateFolder(parent: Instance, folderName: string) {
	for (const child of parent.GetChildren()) {
		if (child.IsA("Folder") && child.Name === folderName) {
			return child;
		}
	}
	const folder = new Instance("Folder");
	folder.Name = folderName;
	folder.Parent = parent;
	return folder;
}

function getActorFolder() {
	if (RunService.IsServer()) {
		return getOrCreateFolder(ServerScriptService, ACTOR_FOLDER_NAME);
	} else {
		const playerScripts = Players.LocalPlayer.FindFirstChildOfClass("PlayerScripts");
		assert(playerScripts);
		return getOrCreateFolder(playerScripts, ACTOR_FOLDER_NAME);
	}
}

function getExecutorTemplate() {
	return RunService.IsServer() ? serverExecutorTemplate : clientExecutorTemplate;
}

class Director {
	private actor: Actor;
	private bindableEvent: BindableEvent;

	constructor(moduleScript: ModuleScript) {
		const folder = getActorFolder();

		this.actor = new Instance("Actor");

		const executor = getExecutorTemplate().Clone();
		executor.Name = "Executor";
		executor.Parent = this.actor;

		const objectValue = new Instance("ObjectValue");
		objectValue.Value = moduleScript;
		objectValue.Parent = this.actor;

		this.bindableEvent = new Instance("BindableEvent");
		this.bindableEvent.Parent = this.actor;

		this.actor.Parent = folder;
	}

	fire(...args: Array<unknown>) {
		this.bindableEvent.Fire(...args);
	}

	destroy() {
		this.actor.Destroy();
	}
}

export = Director;
