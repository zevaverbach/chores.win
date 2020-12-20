import { writable } from 'svelte/store';

export const storeName = 'chores';

function createTwilioStore(listName) {
    const { subscribe, update, set } = writable([]);

    return {
        subscribe,
        getItems: (items) => set(items),
        itemAdded: (item) => update((existing) => existing.concat(item.item)),
        itemRemoved: (args) =>  update((existing) =>
          existing.filter((item) => item.index !== args.index)
        ),
        // add: (chore) => pushItem(listName, { chore }),
        // delete: (index) => removeItem(listName, index),
        // update: (index, value) => updateItem(listName, index, value),
    };
}

export const chores = createTwilioStore(storeName);



