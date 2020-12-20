import { chores, storeName } from "./stores/test";

let syncClient, getList, getItems, pushItem, updateItem;

(async () => {
    try {
      const response = await fetch("http://localhost:5001/token");
      const responseJson = await response.json();
      const token = responseJson.token;
      syncClient = new Twilio.Sync.Client(token, { logLevel: "info" });
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

  globalThis.pushItem = async (listName, item) => {
      const list = await getList(listName);
      console.log('list: ', list);
      try {
          const result = await list.push(item);
          console.log('result: ', result);
          return result.data;
      } catch (e) {
          console.log(e);
      }
  };

  globalThis.removeItem = async (listName, index) => {
    console.log('listName ', listName)
    console.log('index in init', index)
      const list = await getList(listName);
      try {
          await list.remove(index);
      } catch (e) {
          console.log(e);
      }
  };

  updateItem = async (listName, index, value) => {
      const list = await getList(listName);
      try {
          await list.set(index, value);
      } catch (e) {
          console.log(e);
      }
  };

  // as soon as Twilio is working, we write on the store
  getItems(storeName).then((items) => {
    console.log('getItems', items)
    chores.getItems(items)
  });

  // and we declare the listeners to update the store
  getList(storeName).then((choreList) => {
        choreList.on("itemAdded", (item) => chores.itemAdded(item));
        choreList.on("itemRemoved", (args) => chores.itemRemoved(args));
        choreList.on("itemUpdated", (args) => {
            update((existing) =>
                existing.map((item) => {
                    if (item.index === args.item.index) {
                        item.value = args.item.value;
                    }
                })
            );
        });
    });

})();


console.log('getList', getList)
