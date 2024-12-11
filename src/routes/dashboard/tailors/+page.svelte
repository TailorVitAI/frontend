<script>
	import {
		get_user_tailors,
		create_user_tailor,
		delete_user_tailor,
		update_user_tailor
	} from '$lib/services';
	import { convertDateFormat } from '$lib/utils';
	import { Label, Textarea, Input, Button, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import CVsModal from './components/CVsModal.svelte';
	import toast from 'svelte-french-toast';

	let is_loading = true;
	let is_updating = false;
	let tailor = {
		id: null,
		title: null,
		description: null,
		additional: null,
		model_modified_at: null,
		model_created_at: null
	};
	let tailors = [tailor];

	let cvs_modal_is_visible = false;
	let cvs_modal_tailor_id = null;

	let handler_get_user_tailors = () => {
		get_user_tailors()
			.then((response) => {
				tailors = [...response, tailor].reverse();
			})
			.finally(() => {
				is_loading = false;
			});
	};

	let handler_delete_user_tailor = (id) => {
		is_updating = true;
		is_loading = false;
		delete_user_tailor(id)
			.then(() => {
				handler_get_user_tailors();
				toast.success('Tailor deleted.');
			})
			.finally(() => {
				is_updating = false;
			});
	};

	let handler_update_user_tailor = (tailor) => {
		is_updating = true;
		toast.success('Creating a tailored CV, please be patient...');
		update_user_tailor(tailor.id, tailor)
			.then(() => {
				handler_get_user_tailors();
				toast.success('CV created.');
				cvs_modal_is_visible = true;
				cvs_modal_tailor_id = tailor.id;
			})
			.catch(() => {
				toast.error('Something went wrong.');
			})
			.finally(() => {
				is_updating = false;
			});
	};

	let handler_create_user_tailor = (tailor) => {
		is_updating = true;
		toast.success('Creating a tailored CV, please be patient... ');
		create_user_tailor(tailor)
			.then(() => {
				handler_get_user_tailors();
				toast.success('CV created.');
				cvs_modal_is_visible = true;
				cvs_modal_tailor_id = tailor.id;
			})
			.catch(() => {
				toast.error('Failed to create CV.');
			})
			.finally(() => {
				is_updating = false;
			});
	};

	onMount(async () => {
		handler_get_user_tailors();
	});
</script>

<div class="mx-4">
	{#if !is_loading}
		<h1>
			Tailors <span class="opacity-50 text-lg">(total: {tailors.length - 1})</span>
		</h1>
		<p class="mb-5">Here you can tailor your profile and experiences to a specific position.</p>
		{#each tailors as tailor}
			<div class="border rounded-xl mb-4 p-4">
				{#if tailor.id == null}
					<div class="flex">
						<div class="grow">
							<h2 class="mt-0">Tailor (New)</h2>
						</div>
						<div class="flex justify-end gap-x-2 h-min">
							<Button
								color="blue"
								class="content-end"
								on:click={() => handler_create_user_tailor(tailor)}
							>
								Generate CV
							</Button>
						</div>
					</div>
				{:else}
					<div class="flex">
						<div class="grow">
							<h2 class="mt-0">Tailor {`#T${tailor.id}`}</h2>
							<span class="opacity-50 text-sm mb-4">
								Last update: {convertDateFormat(tailor.model_modified_at)}
							</span>
						</div>
						<div class="flex justify-end gap-x-2 h-min">
							<Button
								color="red"
								outline
								on:click={() => handler_delete_user_tailor(tailor.id)}
								disabled={is_updating}
							>
								Delete
							</Button>
							<Button
								color="dark"
								outline
								on:click={() => {
									cvs_modal_is_visible = true;
									cvs_modal_tailor_id = tailor.id;
								}}
								disabled={is_updating}
							>
								CV History
							</Button>
							<Button
								color="blue"
								on:click={() => handler_update_user_tailor(tailor)}
								disabled={is_updating}
							>
								Regenerate CV
							</Button>
						</div>
					</div>
				{/if}
				<div class="grid gap-y-2 {is_updating ? 'opacity-70' : ''}">
					<div class="grow">
						<Label>Title</Label>
						<Input
							bind:value={tailor.title}
							placeholder="the position's title; e.g. Senior Software Engineer "
						/>
					</div>
					<div class="grid grid-cols-2 gap-x-2">
						<div>
							<Label>Description</Label>
							<Textarea
								bind:value={tailor.description}
								placeholder="the job description including requirements, responsibilities, and expectations"
							/>
						</div>
						<div>
							<Label>Additional</Label>
							<Textarea
								bind:value={tailor.additional}
								placeholder="any additional information you want to be considered building your CV"
							/>
						</div>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<div class="flex">
			<Spinner class="grow justify-center" color="blue" size="10" />
		</div>
	{/if}
</div>

<CVsModal tailor_id={cvs_modal_tailor_id} bind:is_visible={cvs_modal_is_visible} />
