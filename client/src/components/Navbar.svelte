<script>
    import Dropdown from "./Dropdown.svelte";
</script>

<nav
    class="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0"
>
    <div class="flex flex-wrap items-center">
        <div
            class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white"
        >
            <a href="/">
                <img src="/openmed2.png" alt="openmed" width="60">
            </a>
        </div>

        <div
            class="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2"
        >
            <span class="relative w-full">
                <button class="btn btn-outline btn-square">
                    &nbsp;&nbsp;&nbsp;<i
                        class="fa fa-microphone pr-0 md:pr-3"
                    />
                </button>
                <button class="btn btn-outline btn-square">
                    &nbsp;&nbsp;&nbsp;<i class="fas fa-video pr-0 md:pr-3" />
                </button>
            </span>
        </div>

        <div
            class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end"
        >
            <ul>
                <li class="flex-1 md:flex-none md:mr-3">
                    <div class="relative inline-block">
                        <button
                            onclick="toggleDD('myDropdown')"
                            class="drop-button text-white focus:outline-none"
                        >
                            <span class="pr-2"
                                ><i class="em em-robot_face" /></span
                            >
                            Hi, User
                            <svg
                                class="h-3 fill-current inline"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                /></svg
                            ></button
                        >
                        <Dropdown />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>
