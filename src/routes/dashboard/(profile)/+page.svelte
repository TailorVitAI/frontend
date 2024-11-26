<script>
	import { get_user_profiles, update_user_profile } from '$lib/services';
	import { convertDateFormat } from '$lib/utils';
	import { Label, Textarea, Input, Button, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let is_loading = true;
	let is_updating = false;
	let profile = {
		id: null,
		summary: null,
		company: null,
		location: null,
		email: null,
		phone: null,
		linkedin: null,
		github: null,
		website: null,
		skills: null,
		languages: null,
		hobbies: null,
		interests: null,
		model_modified_at: null,
		model_created_at: null
	};

	let handler_get_user_profiles = () => {
		get_user_profiles().then((profiles) => {
			profile = profiles[0];
			// @ts-ignore
			profile.skills = JSON.stringify(profile.skills);
			// @ts-ignore
			profile.languages = JSON.stringify(profile.languages);
			// @ts-ignore
			profile.hobbies = JSON.stringify(profile.hobbies);
			// @ts-ignore
			profile.interests = JSON.stringify(profile.interests);
			is_loading = false;
		});
	};

	let handler_update_user_profile = () => {
		is_updating = true;
		// @ts-ignore
		profile.skills = JSON.parse(profile.skills);
		// @ts-ignore
		profile.languages = JSON.parse(profile.languages);
		// @ts-ignore
		profile.hobbies = JSON.parse(profile.hobbies);
		// @ts-ignore
		profile.interests = JSON.parse(profile.interests);
		update_user_profile(profile.id, profile)
			.then(() => {
				handler_get_user_profiles();
			})
			.finally(() => {
				is_updating = false;
			});
	};

	onMount(async () => {
		handler_get_user_profiles();
	});
</script>

<div class="mx-4">
	<h1>My Profile</h1>
	{#if !is_loading}
		<span class="opacity-50 mb-4 text-sm">
			Latest update: {convertDateFormat(profile.model_modified_at)}
		</span>
		<div class="grid gap-y-2 {is_updating ? 'opacity-70' : ''}">
			<div>
				<Label>Summary</Label>
				<Textarea style="height: 100px" bind:value={profile.summary} />
			</div>
			<div class="flex gap-x-2">
				<div class="grow">
					<Label>Company</Label>
					<Input bind:value={profile.company} />
				</div>
				<div class="grow">
					<Label>Location</Label>
					<Input bind:value={profile.location} />
				</div>
			</div>
			<div class="flex gap-x-2">
				<div class="grow">
					<Label>Email</Label>
					<Input bind:value={profile.email} />
				</div>
				<div class="grow">
					<Label>Phone</Label>
					<Input bind:value={profile.phone} />
				</div>
			</div>
			<div class="flex gap-x-2">
				<div class="grow">
					<Label>Linkedin</Label>
					<Input bind:value={profile.linkedin} />
				</div>
				<div class="grow">
					<Label>Github</Label>
					<Input bind:value={profile.github} />
				</div>
				<div class="grow">
					<Label>Website</Label>
					<Input bind:value={profile.website} />
				</div>
			</div>
			<div>
				<Label>Skills</Label>
				<Input bind:value={profile.skills} />
			</div>
			<div>
				<Label>Languages</Label>
				<Input bind:value={profile.languages} />
			</div>
			<div>
				<Label>Hobbies</Label>
				<Input bind:value={profile.hobbies} />
			</div>
			<div>
				<Label>Interests</Label>
				<Input bind:value={profile.interests} />
			</div>
		</div>

		<div class="flex grow justify-end mt-4">
			<Button color="blue" on:click={handler_update_user_profile} disabled={is_updating}>
				{#if is_updating}
					<Spinner color="blue" size="5" />
				{/if}
				Update
			</Button>
		</div>
	{:else}
		<div class="flex">
			<Spinner class="grow justify-center" color="blue" size="10" />
		</div>
	{/if}
</div>
