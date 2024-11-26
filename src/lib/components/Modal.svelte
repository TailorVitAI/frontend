<script>
	// @ts-nocheck

	import { Modal, Spinner } from 'flowbite-svelte';

	export let show = false;
	export let is_loading = false;
	export let size = 'lg';
	export let on_close = () => {
		show = false;
	};
</script>

<Modal
	backdropClass="fixed inset-0 backdrop-filter backdrop-blur-md backdrop-mix-blend-multiply z-[10]"
	{size}
	bind:open={show}
	on:close={on_close}
	autoclose={false}
	outsideclose
>
	{#if is_loading}
		<div class="flex justify-center">
			<Spinner color="blue" />
		</div>
	{:else}
		<slot />
	{/if}
</Modal>
