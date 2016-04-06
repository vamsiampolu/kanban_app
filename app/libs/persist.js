import makeFinalStore from 'alt/utils/makeFinalStore';

export default function(alt,storage,storeName) {
	const finalStore = makeFinalStore(alt);
	try {
		alt.bootstrap(storage.get(storeName));	
	}
	catch(e) {
		console.error('failed to bootstrap data',e);
	}

	finalStore.listen(() => {
		if(!storage.set('debug')) {
			storage.set(storeName,alt.takeSnapshot());
		}
	});
}