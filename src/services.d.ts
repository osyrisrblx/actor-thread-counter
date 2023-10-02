interface ReplicatedStorage {
	TS: Folder & {
		countActorThreads: ModuleScript;
		director: ModuleScript & {
			templates: Folder & {
				ClientExecutor: LocalScript;
				ServerExecutor: Script;
			};
		};
	};
	actors: Folder & {
		Count: ModuleScript;
	};
	rbxts_include: Folder & {
		Promise: ModuleScript;
		RuntimeLib: ModuleScript;
	};
}

interface ServerScriptService {
	TS: Folder & {
		main: Script;
	};
}
