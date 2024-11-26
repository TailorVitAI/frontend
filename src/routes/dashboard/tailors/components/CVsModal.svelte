<script>
	import Modal from '$lib/components/Modal.svelte';
	import { get_user_curriculum_vitaes } from '$lib/services';
	import { convertDateFormat } from '$lib/utils';
	import { Label, Progressbar } from 'flowbite-svelte';
	import pdf_file from '$lib/assets/pdf_file.png';

	export let is_visible = false;
	export let tailor_id = null;

	let is_loading = true;

	let cv = {
		id: null,
		uri: null,
		fitness: null,
		comment: null,
		content: null,
		model_modified_at: null,
		model_created_at: null
	};
	let cvs = [cv];

	let fetch_date = () => {
		if (tailor_id == null) return;

		is_loading = true;
		get_user_curriculum_vitaes(tailor_id)
			.then((response) => {
				cvs = response;
			})
			.finally(() => {
				is_loading = false;
			});
	};

	$: tailor_id, is_visible, fetch_date();
</script>

<Modal bind:is_loading bind:show={is_visible}>
	<h2 class="pb-0">My Tailored CVs</h2>
	<p>Here you can find all the generated csv for the job specification you've just selected.</p>

	<div class="grid gap-y-10">
		{#each cvs as cv}
			<div class="grow mr-3">
				<div class="flex">
					<div>
						<a href="/">
							<img src={pdf_file} width="64px" class="mt-1" alt="" />
						</a>
					</div>
					<div class="grow ml-2">
						<Label>#CV{cv.id}</Label>
						<Label
							>Position Fitness Indicator <span class="opacity-50">({cv.fitness}/5)</span></Label
						>
						<Progressbar progress={parseInt(cv.fitness) * 20} color="yellow" />
						<span class="text-normal opacity-50">{convertDateFormat(cv.model_modified_at)} - </span>
						<a href="/">View Analysis</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Modal>
