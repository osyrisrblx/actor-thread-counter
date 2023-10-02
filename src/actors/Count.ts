function busyWait(s: number) {
	const endTime = tick() + s;
	while (tick() < endTime);
}

export = (sharedTable: SharedTable) => {
	const bucket = math.floor((tick() - (sharedTable.start as number)) * 100);
	SharedTable.update(sharedTable.buckets as SharedTable, bucket, (value) => ((value as number) ?? 0) + 1);
	busyWait(0.1);
};
