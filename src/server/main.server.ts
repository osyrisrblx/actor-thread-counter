import { createBaseplate } from "@rbxts/baseplate";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { countActorThreads } from "shared/countActorThreads";

createBaseplate();

const remoteEvent = new Instance("RemoteEvent", ReplicatedStorage);
remoteEvent.OnServerEvent.Connect(() => Workspace.SetAttribute("ServerActorThreads", countActorThreads()));
