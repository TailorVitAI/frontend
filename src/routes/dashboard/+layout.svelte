<script>
	// @ts-nocheck
	import { t } from 'svelte-i18n';
	import { Footer } from 'flowbite-svelte';
	import '../../app.pcss';
	import SidebarWrapper from '$lib/components/SidebarWrapper.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { get_user_account } from '$lib/services';
	import { onMount } from 'svelte';
	import logo_square from '$lib/assets/logo-square.png';

	let loaded = false;
	onMount(() => {
		get_user_account();
		loaded = true;
	});
</script>

<div>
	{#if loaded}
		<div class="flex">
			<SidebarWrapper title="TailorVitAI" subtitle="tailor your CV to the job" logo={logo_square}>
				<SidebarItem label={$t('My Profile')} navigate={'/dashboard/'} />
				<SidebarItem label={$t('My Experiences')} navigate={'/dashboard/experiences'} />
				<SidebarItem label={$t('Tailors')} navigate={'/dashboard/tailors'} />
			</SidebarWrapper>

			<div class="main-page w-full mx-4 mb-4">
				<slot />
			</div>
		</div>
		<Footer name="" address="" year={2024} />
	{/if}
</div>

<style>
	.main-page {
		box-shadow: inset 30px 0px 10px -30px rgba(0, 0, 0, 0.04);
	}
</style>
