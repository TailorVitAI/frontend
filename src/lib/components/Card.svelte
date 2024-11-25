<script>
	export let title = 'Title';
	export let subtitle = 'Subtitle';
	import { Card } from 'flowbite-svelte';
</script>

<Card size="lg" class="mb-3 block max-w-full" padding="none">
	<div class="mb-2">
		<div class="mb-2 flex">
			<div>
				<h1 class="m-5 mb-1 text-lg font-bold text-gray-800 dark:text-white">
					{title}
				</h1>
				<div class="mb-5 ml-5">
					{subtitle}
				</div>
			</div>
			<div class="mr-2 flex grow justify-end self-end">
				<div>
					<slot name="tools" />
				</div>
			</div>
		</div>

		<slot />
	</div>
</Card>
