<script>
	// @ts-nocheck
	import { Sidebar, SidebarWrapper } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
	import logo_wide from '$lib/assets/logo-wide.png';
	import LanguageSwitch from '$lib/components/LanguageSwitch.svelte';

	export let title = '';
	export let subtitle = '';
	export let logo = '';
</script>

<Sidebar>
	<div class="sidebar">
		<SidebarWrapper divClass="overflow-y-auto py-4">
			<div class="mb-6 ml-3 flex">
				{#if logo}
					<img src={logo} class="mr-2 h-12" alt="logo" />
				{/if}
				<div>
					{#if title}
						<p class="brand-title dark:text-gray-200">{title}</p>
					{/if}
					{#if subtitle}
						<p class="brand-subtitle dark:text-gray-400">{subtitle}</p>
					{/if}
				</div>
			</div>

			<slot />
		</SidebarWrapper>
	</div>
	<div class="mb-5">
		<div class="flex justify-center mb-3">
			<img width="120" src={logo_wide} alt="logo" class="grayscale" />
		</div>
		<div class="flex justify-center mt-3">
			<DarkMode
				btnClass="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5 border mr-1"
			/>
			<LanguageSwitch />
		</div>
	</div>
</Sidebar>

<style>
	.brand-title {
		font-size: 25px;
		font-style: normal;
		font-weight: 700;
		line-height: 31px;
	}
	.brand-subtitle {
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		line-height: 12px;
	}
	.sidebar {
		height: 88vh !important;
	}
	.grayscale {
		filter: grayscale(100%);
		transition: filter 0.3s ease;
		opacity: 50%;
	}
	.grayscale:hover {
		filter: grayscale(0%);
		opacity: 100%;
	}
</style>
