import { writable } from 'svelte/store';
const SyncClient = window.Twilio.Sync.Client


let syncClient, getList, getItems, pushItem, removeItem, updateItem;

const setupTwilioClient = async () => {
  try {
      const response = await fetch("http://localhost:5001/token");
      const responseJson = await response.json();
      const token = responseJson.token;
      syncClient = new SyncClient(token, { logLevel: "info" });
  } catch (e) {
      console.log(e);
  }

  syncClient.on("connectionStateChanged", (state) => {
      if (state != "connected") {
          console.log(`Sync is not live (websocket connection ${state})`);
      } else {
          console.log("Sync is live!");
      }
  });

  getList = async (name) => syncClient.list(name);

  getItems = async (listName, from, pageSize, order) => {
    const list = await getList(listName);
    const items = await list.getItems({ from, pageSize, order });
    return items.items.map((item) => item.data);
  };



  // chores = createSyncStore('chores');
}

function createSyncStore() {
  const { subscribe, update, set } = writable([]);

  // getItems(listName).then((items) => set(items));




  return {
      subscribe,
  };
}



setupTwilioClient().then(() => {
  const { subscribe, update, set } = writable([]);

  getItems('chores').then((items) => set(items));

  console.log('getList', getList)
  console.log('createSyncStore', createSyncStore())
  createSyncStore().add = (chore) => pushItem(listName, { chore })

})




export const chores = createSyncStore('chores');

// function createSyncStore(listName) {
//     const { subscribe, update, set } = writable([]);

//     getItems(listName).then((items) => set(items));




//     return {
//         subscribe,
//     };
// }
