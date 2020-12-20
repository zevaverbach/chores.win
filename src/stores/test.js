import { writable } from 'svelte/store';

function createTwilioStore() {
    const { subscribe, update, set } = writable([]);

    return {
        subscribe,
        getItems: (items) => set(items),
        add: (chore) => pushItem(listName, { chore }),
        delete: (index) => removeItem(listName, index),
        update: (index, value) => updateItem(listName, index, value),
    };
}

export const chores = createTwilioStore();
