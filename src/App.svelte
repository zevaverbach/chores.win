<script>
    import { fade } from "svelte/transition";
    import { chores } from "./stores/twiliostore";

    let newChore = "";

    const createChore = () => {
        pushItem("chores", { chore: newChore });
        newChore = "";
    };
    const deleteChore = (index) => removeItem("chores", index);
    const updateChore = (index, newValue) => chores.update(index, newValue);
</script>

<svelte:head>
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
