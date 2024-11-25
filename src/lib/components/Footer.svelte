<script>
	import { Footer, FooterCopyright } from 'flowbite-svelte';
	export let name = '';
	export let address = '';
	export let year = 0;
</script>

<div class="mt-4">
	<Footer>
		<FooterCopyright href={address} by={name + ' (v1.0)'} {year} />
	</Footer>
</div>

<style>
</style>
