import Iris from "@rbxts/iris";
import { Players, ReplicatedStorage, RunService, Workspace } from "@rbxts/services";
import { countActorThreads } from "shared/countActorThreads";

const remoteEvent = ReplicatedStorage.WaitForChild("RemoteEvent") as RemoteEvent;

Iris.Init();
Iris.Connect(() => {
	Iris.Window(["Debug"]);

	Iris.Text([`MaxPlayers: ${RunService.IsStudio() ? "Studio" : Players.MaxPlayers}`]);

	Iris.Text([`Client Actor Threads: ${Workspace.GetAttribute("ClientActorThreads") ?? "?"}`]);
	Iris.Text([`Server Actor Threads: ${Workspace.GetAttribute("ServerActorThreads") ?? "?"}`]);

	if (Iris.Button(["Check"]).clicked()) {
		remoteEvent.FireServer();
		Workspace.SetAttribute("ClientActorThreads", countActorThreads());
	}

	Iris.End();
});
