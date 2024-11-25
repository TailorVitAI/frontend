import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

// Register your messages
register('en', () => import('$lib/internationalization/en.json'));
register('ge', () => import('$lib/internationalization/ge.json'));

// Initialize the library
init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator()
});