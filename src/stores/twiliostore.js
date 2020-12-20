import { writable } from 'svelte/store';

function createTwilioStore() {
    const { subscribe, update, set } = writable([]);

    return {
        subscribe,
        getItems: (items) => set(items),
        itemAdded: (item) => update((existing) => existing.concat(item.item)),
        itemRemoved: (args) =>  update((existing) =>
          existing.filter((item) => item.index !== args.index)
        ),
        itemUpdated: (args) => {
          update((existing) =>
              existing.map((item) => {
                  if (item.index === args.item.index) {
                      item.value = args.item.value;
                  }
              })
          );
      }
    };
}

export const chores = createTwilioStore();



