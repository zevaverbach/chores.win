// var SyncClient = require('twilio-sync');
// import SyncClient from 'twilio-sync';

import { writable } from "svelte/store";
// console.log('store', store);

let syncClient, getList, getItems, pushItem, removeItem, updateItem;

// const setupTwilioClient = async () => {
  // try {
  //     const response = await fetch("http://localhost:5001/token");
  //     const responseJson = await response.json();
  //     const token = responseJson.token;
  //     syncClient = new SyncClient(token, { logLevel: "info" });
  // } catch (e) {
  //     console.log(e);
  // }

  // syncClient.on("connectionStateChanged", (state) => {
  //     if (state != "connected") {
  //         console.log(`Sync is not live (websocket connection ${state})`);
  //     } else {
  //         console.log("Sync is live!");
  //     }
  // });

  // getList = async (name) => syncClient.list(name);

  // getItems = async (listName, from, pageSize, order) => {
  //     const list = await getList(listName);
  //     const items = await list.getItems({ from, pageSize, order });
  //     return items.items.map((item) => item.data);
  // };

  // pushItem = async (listName, item) => {
  //     const list = await getList(listName);
  //     try {
  //         const result = await list.push(item);
  //         return result.data;
  //     } catch (e) {
  //         console.log(e);
  //     }
  // };

  // removeItem = async (listName, index) => {
  //     const list = await getList(listName);
  //     try {
  //         await list.remove(index);
  //     } catch (e) {
  //         console.log(e);
  //     }
  // };

  // updateItem = async (listName, index, value) => {
  //     const list = await getList(listName);
  //     try {
  //         await list.set(index, value);
  //     } catch (e) {
  //         console.log(e);
  //     }
  // };

const createSyncStore = async (listName) => {

  //   try {
  //     const response = await fetch("http://localhost:5001/token");
  //     const responseJson = await response.json();
  //     const token = responseJson.token;
  //     syncClient = new SyncClient(token, { logLevel: "info" });
  // } catch (e) {
  //     console.log(e);
  // }

  // syncClient.on("connectionStateChanged", (state) => {
  //     if (state != "connected") {
  //         console.log(`Sync is not live (websocket connection ${state})`);
  //     } else {
  //         console.log("Sync is live!");
  //     }
  // });

  // getList = async (name) => syncClient.list(name);

  // getItems = async (listName, from, pageSize, order) => {
  //     const list = await getList(listName);
  //     const items = await list.getItems({ from, pageSize, order });
  //     return items.items.map((item) => item.data);
  // };

  // pushItem = async (listName, item) => {
  //     const list = await getList(listName);
  //     try {
  //         const result = await list.push(item);
  //         return result.data;
  //     } catch (e) {
  //         console.log(e);
  //     }
  // };

  // removeItem = async (listName, index) => {
  //     const list = await getList(listName);
  //     try {
  //         await list.remove(index);
  //     } catch (e) {
  //         console.log(e);
  //     }
  // };

  // updateItem = async (listName, index, value) => {
  //     const list = await getList(listName);
  //     try {
  //         await list.set(index, value);
  //     } catch (e) {
  //         console.log(e);
  //     }
  // };




       const { set, subscribe, update } = writable([]);

  //     getItems(listName).then((items) => set(items));

  //     getList(listName).then((choreList) => {
  //         choreList.on("itemAdded", (item) => {
  //             update((existing) => existing.concat(item.item));
  //         });
  //         choreList.on("itemRemoved", (args) => {
  //             update((existing) =>
  //                 existing.filter((item) => item.index !== args.index)
  //             );
  //         });
  //         choreList.on("itemUpdated", (args) => {
  //             update((existing) =>
  //                 existing.map((item) => {
  //                     if (item.index === args.item.index) {
  //                         item.value = args.item.value;
  //                     }
  //                 })
  //             );
  //         });
  //     });

  //     return {
  //         subscribe,
  //         add: (chore) => pushItem(listName, { chore }),
  //         delete: (index) => removeItem(listName, index),
  //         update: (index, value) => updateItem(listName, index, value),
  //     };

  return {
    subscribe,
    add: () => set({})
  }

  };

export const chores = createSyncStore("chores");
// };

// setupTwilioClient();

