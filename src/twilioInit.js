import { chores, STORE_NAME } from "./stores/twiliostore";

(async () => {
  let syncClient;
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

  const getList = async (name) => syncClient.list(name);

  const getItems = async (listName, from, pageSize, order) => {
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
      const list = await getList(listName);
      try {
          await list.remove(index);
      } catch (e) {
          console.log(e);
      }
  };

  globalThis.updateItem = async (listName, index, value) => {
      const list = await getList(listName);
      try {
          await list.set(index, value);
      } catch (e) {
          console.log(e);
      }
  };

  // as soon as Twilio is working, we write on the store
  getItems(STORE_NAME).then((items) => chores.getItems(items));

  // and we declare the listeners to update the store
  getList(STORE_NAME).then((choreList) => {
        choreList.on("itemAdded", (item) => chores.itemAdded(item));
        choreList.on("itemRemoved", (args) => chores.itemRemoved(args));
        choreList.on("itemUpdated", (args) => chores.itemUpdated(args));
    });
})();
