import { getUuidV4 } from 'src/util/uuid';
import { createWritableLS } from './writableLocalStorage';
import type { ProportionModel } from './proportionModel';

export type ProportionIdTuple = [string, ProportionModel];

const store = createWritableLS<ProportionIdTuple[]>('starredProportions', [], 1500);

function add(proportion: ProportionModel) {
	const storeValue = store.get();
	const newId = getUuidV4();
	storeValue.push([newId, proportion]);
	store.set(storeValue);
}

function remove(id: string) {
	const storeValue = store.get();
	storeValue.splice(
		storeValue.findIndex(([storeId]) => storeId === id),
		1
	);
	store.set(storeValue);
}

export const starredProportions = {
	subscribe: store.subscribe,
	get: store.get,
	add,
	remove
};
