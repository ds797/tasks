import App from './App.svelte';
import { methods } from './methods';

methods();

const app = new App({
	target: document.body
});

export default app;