<script>
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { locale, t } from 'svelte-i18n';

	function switchLanguage(lang) {
		locale.set(lang);
	}
</script>

<ButtonGroup size="xs">
	<Button size="xs" on:click={() => switchLanguage('en')}>EN</Button>
	<Button size="xs" on:click={() => switchLanguage('ge')}>GE</Button>
</ButtonGroup>
