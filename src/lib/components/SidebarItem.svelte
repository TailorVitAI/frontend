<!-- SidebarItem.svelte -->
<script>
	import { goto } from '$app/navigation';

	export let label = '';
	export let subtitle = '';
	export let active = false;
	export let navigate = '';

	function onClick() {
		goto(navigate);
	}
</script>

<button class="text-sm sidebar-item w-full {active ? 'active' : ''}" on:click={onClick}>
	<span class="icon">
		<slot name="icon"></slot>
	</span>
	<div>
		<p class="label text-gray-700 dark:text-gray-300">{label}</p>
		<p class="subtitle text-gray-700 dark:text-gray-300">{subtitle}</p>
	</div>
	<slot></slot>
</button>

<style>
	.sidebar-item {
		display: flex;
		align-items: center;
		padding: 8px 0px;
		border-radius: 0px;
		cursor: pointer;
		text-decoration: none;
		color: inherit;
		transition: background-color 0.1s;
	}

	.sidebar-item:hover {
		background: rgb(240, 241, 244);
	}

	:global(.dark) .sidebar-item:hover {
		background: rgb(42, 50, 64);
	}

	.sidebar-item.active {
		background: rgba(55, 88, 249, 0.05);
	}

	.icon {
		margin-right: 10px;
		margin-left: 20px;
	}

	.label {
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 24px;
	}

	.subtitle {
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
	}
</style>
