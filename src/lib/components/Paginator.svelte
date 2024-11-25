<script>
	// @ts-nocheck

	export let total = 50;
	export let limit = 10;
	export let customClass = '';
	let page = 1;
	// @ts-ignore

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const setPage = (targetPage) => {
		page = targetPage;
		dispatch('pageChange', { page });
	};

	const previousPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const nextPage = () => {
		if (page < total) {
			setPage(page + 1);
		}
	};

	let paginationWindow = {};

	// Explicit reactive statement to ensure Svelte tracks changes
	$: (paginationWindow = calculatePaginationWindow()), page, total, limit;

	function calculatePaginationWindow() {
		let start = Math.max(page - Math.floor(limit / 2), 1);
		let end = Math.min(start + limit - 1, total);

		if (end === total) {
			start = Math.max(end - limit + 1, 1);
		}

		return { start, end };
	}

	$: needsLeftEllipsis = paginationWindow.start > 1;
	$: needsRightEllipsis = paginationWindow.end < total;
	$: range = Array.from(
		{ length: paginationWindow.end - paginationWindow.start + 1 },
		(_, i) => i + paginationWindow.start
	);
</script>

<nav class={customClass}>
	<ul class="inline-flex -space-x-px text-sm">
		<li>
			<button
				on:click={() => {
					previousPage();
				}}
				class="flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				Previous
			</button>
		</li>

		{#if needsLeftEllipsis}
			<li>
				<button
					on:click={() => setPage(1)}
					class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>1</button
				>
			</li>
			<li>
				<button
					disabled
					class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>...</button
				>
			</li>
		{/if}

		{#each range as pageNumber}
			<li>
				<button
					on:click={() => setPage(pageNumber)}
					class={pageNumber == page
						? 'flex h-8 items-center justify-center border border-gray-300 bg-gray-100 px-3 leading-tight text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
						: 'flex h-8 items-center justify-center border border-gray-300 bg-gray-100  px-3 leading-tight text-gray-500 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
				>
					{pageNumber}
				</button>
			</li>
		{/each}

		{#if needsRightEllipsis}
			<li>
				<button
					disabled
					class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>...</button
				>
			</li>
			<li>
				<button
					on:click={() => setPage(total)}
					class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>{total}</button
				>
			</li>
		{/if}

		<li>
			<button
				on:click={() => {
					nextPage();
				}}
				class="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				Next
			</button>
		</li>
	</ul>
</nav>
