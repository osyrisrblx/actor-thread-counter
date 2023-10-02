import { ReplicatedStorage } from "@rbxts/services";
import Director from "./director";

export function countActorThreads() {
	const directors = new Array<Director>();

	for (let i = 0; i < 20; i++) {
		directors.push(new Director(ReplicatedStorage.actors.Count));
	}

	const sharedTable = new SharedTable();
	sharedTable.start = tick();
	sharedTable.buckets = new SharedTable();
	for (const director of directors) {
		director.fire(sharedTable);
	}

	task.wait();

	let maxValue = 0;
	for (const [_, value] of sharedTable.buckets as never as Map<number, number>) {
		maxValue = math.max(maxValue, value as number);
	}

	return maxValue;
}
