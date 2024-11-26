<script>
	import {
		delete_user_experience,
		get_user_experiences,
		update_user_experience,
		create_user_experience
	} from '$lib/services';
	import { convertDateFormat } from '$lib/utils';
	import { Label, Textarea, Input, Button, Spinner, Select } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let is_loading = true;
	let is_updating = false;
	let experience = {
		id: null,
		title: null,
		role: null,
		location: null,
		type: null,
		category: null,
		url: null,
		starting: null,
		ending: null,
		description: null,
		model_modified_at: null,
		model_created_at: null
	};
	let experiences = [experience];
	let type_items = [
		{ value: 'FLT', name: 'Full-time' },
		{ value: 'PRT', name: 'Part-time' },
		{ value: 'SLE', name: 'Self-employed' },
		{ value: 'VOL', name: 'Volunteer' }
	];
	let category_items = [
		{ value: 'EDU', name: 'Education' },
		{ value: 'CAR', name: 'Carrier' },
		{ value: 'PRJ', name: 'Project' }
	];

	let handler_get_user_experiences = () => {
		get_user_experiences()
			.then((response) => {
				experiences = [...response, experience];
			})
			.finally(() => {
				is_loading = false;
			});
	};

	let handler_delete_user_experience = (id) => {
		is_updating = true;
		is_loading = false;
		delete_user_experience(id)
			.then(() => {
				handler_get_user_experiences();
			})
			.finally(() => {
				is_updating = false;
			});
	};

	let handler_update_user_experience = (experience) => {
		is_updating = true;
		update_user_experience(experience.id, experience)
			.then(() => {
				handler_get_user_experiences();
			})
			.finally(() => {
				is_updating = false;
			});
	};

	let handler_create_user_experience = (experience) => {
		is_updating = true;
		create_user_experience(experience)
			.then(() => {
				handler_get_user_experiences();
			})
			.finally(() => {
				is_updating = false;
			});
	};

	onMount(async () => {
		handler_get_user_experiences();
	});
</script>

<div class="mx-4">
	{#if !is_loading}
		<h1>
			My Experiences <span class="opacity-50 text-lg">(total: {experiences.length - 1})</span>
		</h1>
		<p class="mb-5">Add all your experiences here. Order is not important.</p>
		{#each experiences as experience, index}
			<div class="border rounded-xl mb-4 p-4">
				<h2 class="mt-0">Experience {experiences.length > index + 1 ? index + 1 : '(New)'}</h2>
				{#if experience.id != null}
					<span class="opacity-50 mb-4 text-sm">
						Latest update: {convertDateFormat(experience.model_modified_at)}
					</span>
				{/if}
				<div class="grid gap-y-2 {is_updating ? 'opacity-70' : ''}">
					<div class="flex gap-x-2">
						<div class="grow">
							<Label>Title</Label>
							<Input bind:value={experience.title} />
						</div>
						<div class="grow">
							<Label>Role</Label>
							<Input bind:value={experience.role} />
						</div>
						<div class="grow">
							<Label>Location</Label>
							<Input bind:value={experience.location} />
						</div>
					</div>
					<div class="flex gap-x-2">
						<div class="grow">
							<Label>Type</Label>
							<Select bind:value={experience.type} items={type_items} />
						</div>
						<div class="grow">
							<Label>Category</Label>
							<Select bind:value={experience.category} items={category_items} />
						</div>
						<div class="grow">
							<Label>URL</Label>
							<Input bind:value={experience.url} />
						</div>
					</div>
					<div class="flex gap-x-2">
						<div class="grow">
							<Label>Starting</Label>
							<Input type="date" bind:value={experience.starting} />
						</div>
						<div class="grow">
							<Label>Starting</Label>
							<Input type="date" bind:value={experience.ending} />
						</div>
					</div>
					<div class="grow">
						<Label>Description</Label>
						<Textarea bind:value={experience.description} />
					</div>
				</div>

				<div class="flex grow justify-end mt-4 gap-x-2">
					{#if experience.id != null}
						<Button
							color="red"
							outline
							on:click={() => handler_delete_user_experience(experience.id)}
							disabled={is_updating}
						>
							{#if is_updating}
								<Spinner color="red" size="5" />
							{/if}
							Delete
						</Button>
						<Button
							color="blue"
							on:click={() => handler_update_user_experience(experience)}
							disabled={is_updating}
						>
							{#if is_updating}
								<Spinner color="blue" size="5" />
							{/if}
							Update
						</Button>
					{:else}
						<div class="flex grow justify-end">
							<Button
								color="blue"
								class="content-end"
								on:click={() => handler_create_user_experience(experience)}
							>
								Add a new Experiment
							</Button>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	{:else}
		<div class="flex">
			<Spinner class="grow justify-center" color="blue" size="10" />
		</div>
	{/if}
</div>
