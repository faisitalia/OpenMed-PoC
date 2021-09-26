<script lang="ts">
	import Container from "sveltestrap/src/Container.svelte";
	import Navbar from "./components/Navbar.svelte";
	import Sidebar from "./components/Sidebar.svelte";
	import Footer from "./components/Footer.svelte";

	export let page;

	let segment

	let theme = "dark";
	let color = "dark";
	let title = "OpenMed";
	//import Sample from './Sample.svelte'
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="sb-nav-fixed">
	<Navbar {color} {title} />
	<div id="layoutSidenav">
		<Sidebar {segment} {theme} />
		<div id="layoutSidenav_content">
			<main>
				<Container fluid={true}>
					<svelte:component this={page} />
				</Container>
			</main>
			<Footer />
		</div>
	</div>
</div>
