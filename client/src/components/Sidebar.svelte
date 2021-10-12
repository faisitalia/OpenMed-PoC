<script>
    export let title = ""
    function selected(label) {
        let res = label == title ? "border-blue-800" : "border-gray-800" 
        console.log(label)
        return res
    }
</script>
<div
    class="bg-gray-800 shadow-xl h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48"
>
    <div
        class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between"
    >
        <ul
            class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left"
        >
            <li class="mr-3 flex-1">
                <a
                    href="/"
                    class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2  hover:border-red-500 {selected("Home")}" 
                >
                    <i class="fa fa-home pr-0 md:pr-3" /><span
                        class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block"
                        >Home</span
                    >
                </a>
            </li>
            <li class="mr-3 flex-1">
                <a
                    href="/app/users"
                    class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 hover:border-pink-500 {selected("Users")}"
                >
                    <i class="fas fa-tasks pr-0 md:pr-3" /><span
                        class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block"
                        >Users</span
                    >
                </a>
            </li>
            <li class="mr-3 flex-1">
                <a
                    href="/app/schedule"
                    class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 {selected("Schedule")} hover:border-purple-500"
                >
                    <i class="fa fa-envelope pr-0 md:pr-3" /><span
                        class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block"
                        >Schedule</span
                    >
                </a>
            </li>
            <li class="mr-3 flex-1">
                <a
                    href="/app/Conference"
                    class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 {selected("Conference")}"
                >
                    <i
                        class="fas fa-chart-area pr-0 md:pr-3 text-blue-600"
                    /><span
                        class="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block"
                        >Conference</span
                    >
                </a>
            </li>
        </ul>
    </div>
</div>
