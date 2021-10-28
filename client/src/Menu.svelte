<script>
    export let menu;
    export let title;
    import { onMount } from "svelte";
    onMount(() => {
        const btn = document.querySelector("button.mobile-menu-button");
        const menu = document.querySelector(".mobile-menu");
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    });
</script>

<nav class="bg-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
            <div class="flex space-x-7">
                <div>
                    <!-- Website Logo -->
                    <a href="/" class="flex items-center py-4 px-2">
                        <img
                            src="/openmed2.png"
                            alt="Logo"
                            class="h-8 w-8 mr-2"
                        />
                    </a>
                </div>
                <!-- Primary Navbar items -->
                <div class="hidden md:flex items-center space-x-1">
                    {#each menu as item}
                        <a
                            href={item.path}
                            class={"py-4 px-2 text-green-500 border-b-4  font-semibold border " +
                                (item.name == title ? "bg-black" : "bg-white")}
                            >{item.name}</a
                        >
                    {/each}
                </div>
            </div>
            <!-- Secondary Navbar items -->
            <div class="hidden md:flex items-center space-x-3 ">
                <a
                    href="/"
                    class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
                    >Log In</a
                >
            </div>
            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <button class="outline-none mobile-menu-button">
                    <svg
                        class=" w-6 h-6 text-gray-500 hover:text-green-500 "
                        x-show="!showMenu"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <!-- mobile menu -->
    <div class="hidden mobile-menu">
        <ul class="">
            {#each menu as item}
                <li class="active">
                    <a
                        href={item.path}
                        class={"block text-sm px-2 py-4 text-white font-semibold " +
                            (item.name == title ? "bg-black" : "bg-green-500")}
                        >{item.name}</a
                    >
                </li>
            {/each}
        </ul>
    </div>
</nav>
