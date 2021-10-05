<script lang="ts">
	function ciao() { alert("ciao")}
</script>

<ons-page id="helloworld-page">
	<ons-toolbar>
		<div class="center" />
		<div class="right">
			<ons-toolbar-button >
				<ons-icon icon="ion-ios-menu, material:md-menu" />
			</ons-toolbar-button>
		</div>
	</ons-toolbar>

	<p style="text-align: center">
		<ons-button on:click={ciao}>Click me!</ons-button>
	</p>
</ons-page>
