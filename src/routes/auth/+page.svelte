<script>
	import { Card, Button, Label, Input } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import { login_user } from '$lib/services';
	import logo from '$lib/assets/logo-wide.png';
	import LanguageSwitch from '$lib/components/LanguageSwitch.svelte';

	let username = '';
	let password = '';

	let error_msg = '';
	let success = false;

	const handle_login = () => {
		login_user(username, password)
			// @ts-ignore
			.then((userCredential) => {
				goto('/');
			})
			// @ts-ignore
			.catch((error) => {
				const errorCode = error.code;
				error_msg = 'Login failed.';
				console.log(errorCode, error_msg);
				success = false;
			});
	};

	onMount(() => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
	});
</script>

<div class="flex h-screen items-center justify-center dark:bg-gray-900">
	<Card class="w-full max-w-md dark:bg-gray-900">
		<img src={logo} alt="logo" />
		<h5 class="flex justify-center mt-10 text-lg font-medium text-gray-900 dark:text-white">
			Sign in to your account
		</h5>
		<form class="flex flex-col space-y-6 mt-5" action="">
			<Label class="space-y-2">
				<span>Username</span>
				<Input
					type="text"
					name="username"
					placeholder="name@company.com"
					required
					bind:value={username}
				/>
			</Label>
			<Label class="space-y-2">
				<span>Password</span>
				<Input
					type="password"
					name="password"
					placeholder="••••••••••"
					required
					bind:value={password}
				/>
			</Label>
			<Button
				disabled={username == '' || password == ''}
				color="blue"
				type="submit"
				class="w-full"
				on:click={handle_login}>Login</Button
			>
			<Label color="red">{error_msg}</Label>
		</form>

		<!-- <div class="relative flex py-5 items-center">
			<div class="flex-grow border-t border-gray-400"></div>
			<span class="flex-shrink mx-4 text-gray-400">OR</span>
			<div class="flex-grow border-t border-gray-400"></div>
		</div>

		<div class="flex gap-x-2">
			<Button outline>
				<img width="100" src='' alt="google" />
			</Button>
		</div> -->

		<div class="mt-10 text-center text-sm font-medium text-gray-500 dark:text-gray-300">
			<div class="mb-3">
				Not registered?
				<a href="/" class="text-primary-700 dark:text-primary-500 hover:underline"> Contact us! </a>
			</div>

			<LanguageSwitch />
		</div>
	</Card>
</div>

<style>
</style>
