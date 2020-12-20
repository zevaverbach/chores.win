<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";
    import { chores } from "./stores/test";

    // let twilioReady = false;
    // let mounted = false;
    // let syncClient, getList, getItems, pushItem, removeItem, updateItem, chores;

    // onMount(() => {
    //     mounted = true;
    //     if (twilioReady) {
    //         setupTwilioClient();
    //     }
    // });

    // const twilioLoaded = () => {
    //     twilioReady = true;
    //     if (mounted) {
    //         setupTwilioClient();
    //     }
    // };

    // const setupTwilioClient = async () => {
    //     try {
    //         const response = await fetch("http://localhost:5001/token");
    //         const responseJson = await response.json();
    //         const token = responseJson.token;
    //         syncClient = new Twilio.Sync.Client(token, { logLevel: "info" });
    //     } catch (e) {
    //         console.log(e);
    //     }

    //     syncClient.on("connectionStateChanged", (state) => {
    //         if (state != "connected") {
    //             console.log(`Sync is not live (websocket connection ${state})`);
    //         } else {
    //             console.log("Sync is live!");
    //         }
    //     });

    //     getList = async (name) => syncClient.list(name);

    //     getItems = async (listName, from, pageSize, order) => {
    //         const list = await getList(listName);
    //         const items = await list.getItems({ from, pageSize, order });
    //         return items.items.map((item) => item.data);
    //     };

    //     pushItem = async (listName, item) => {
    //         const list = await getList(listName);
    //         try {
    //             const result = await list.push(item);
    //             return result.data;
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };

    //     removeItem = async (listName, index) => {
    //         const list = await getList(listName);
    //         try {
    //             await list.remove(index);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };

    //     updateItem = async (listName, index, value) => {
    //         const list = await getList(listName);
    //         try {
    //             await list.set(index, value);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };

    //     const createSyncStore = (listName) => {
    //         const { set, subscribe, update } = writable([]);

    //         getItems(listName).then((items) => set(items));

    //         getList(listName).then((choreList) => {
    //             choreList.on("itemAdded", (item) => {
    //                 update((existing) => existing.concat(item.item));
    //             });
    //             choreList.on("itemRemoved", (args) => {
    //                 update((existing) =>
    //                     existing.filter((item) => item.index !== args.index)
    //                 );
    //             });
    //             choreList.on("itemUpdated", (args) => {
    //                 update((existing) =>
    //                     existing.map((item) => {
    //                         if (item.index === args.item.index) {
    //                             item.value = args.item.value;
    //                         }
    //                     })
    //                 );
    //             });
    //         });

    //         return {
    //             subscribe,
    //             add: (chore) => pushItem(listName, { chore }),
    //             delete: (index) => removeItem(listName, index),
    //             update: (index, value) => updateItem(listName, index, value),
    //         };
    //     };

    //     chores = createSyncStore("chores");
    // };

    $: console.log("from app", $chores);

    let newChore = "";
    const createChore = () => {
        chores.add(newChore);
        newChore = "";
    };

    const deleteChore = (index) => chores.delete(index);

    const updateChore = (index, newValue) => {
        chores.update(index, newValue);
    };
</script>

<svelte:head>
    <!--<script
        src="//media.twiliocdn.com/sdk/js/sync/v0.8/twilio-sync.min.js"
        on:load={twilioLoaded} ✂prettier:content✂="CiAgICA=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script>-->
    <script src="http://api.ipify.org?format=jsonp&callback=getIP">
    </script>
    <script>
        function getIP(json) {
            console.log(json.ip);
        }
    </script>
</svelte:head>

<nav />

<main path="/">
    <form on:submit|preventDefault={createChore}>
        <input bind:value={newChore} type="text" />
        <input
            style="cursor:pointer"
            type="submit"
            disabled={newChore === ''} />
    </form>
    <div>
        {#if $chores && $chores.length > 0}
            {#each $chores as chore}
                <div in:fade>
                    {chore.value.chore}
                    <button
                        style="cursor: pointer"
                        on:click={() => deleteChore(chore.index)}>delete</button>
                </div>
            {/each}
        {/if}
    </div>
</main>
