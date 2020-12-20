import { chores } from "./stores/test";

let syncClient, getList, getItems, pushItem, removeItem, updateItem;

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

  pushItem = async (listName, item) => {
      const list = await getList(listName);
      try {
          const result = await list.push(item);
          return result.data;
      } catch (e) {
          console.log(e);
      }
  };

  removeItem = async (listName, index) => {
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
  getItems('chores').then((items) => chores.getItems(items));


})();


// const twilioClientInit = async () => {

// }

// twilioClientInit()


console.log('getList', getList)
