<script>
	import { createEventDispatcher } from 'svelte';
	import { slide } from '../js/transition';
	import Chevron from './svg/Chevron.svelte';
	import Input from './element/Input.svelte';
	import Color from './element/Color.svelte';
	import Colors from './element/Colors.svelte';
	import Date from './element/Date.svelte';
	import Time from './element/Time.svelte';

	export let menu = {};

	let set = v => v;
	
	const dispatch = createEventDispatcher();
	
	const key = e => {
		if (menu.key) menu.key(e);

		if (e.key !== 'Escape') return;

		if (show !== -1) menu.close();
		else dispatch('close');
	}

	let show = -1;
</script>

<svelte:window on:keydown={key} />

{ #if show === -1 }
	<main transition:slide={{ axis: 'both' }}>
		<div class='items'>
			<div class='title'>
				<button type='icon' on:click={() => dispatch('close')}>
					<Chevron direction={'left'} size={'1.5rem'} color={'var(--plink)'} />
				</button>
				{ #if menu.name }
					<h3 class='header' style={'cursor: default;'}>{menu.name}</h3>
				{ /if }
			</div>

			{ #each menu.children ?? [] as child, index }
				{ #if !child.hide }

					{ #if child.description }
						<p class={'description'}>{child.description}</p>
					{ /if }

					{ #if child.name && (child.type ?? 'menu') === 'menu' }
						<button class='inverse' on:click={() => child.click ? child.click() : show = index}>{child.name}</button>
					{ :else if child.name && child.type === 'action' }
						<button on:click={() => { if (child.click) child.click(); dispatch('close'); }}>{child.name}</button>
					{ :else if child.type === 'input' }
						<Input value={child.value} name={child.name} placeholder={child.placeholder} set={child.set ?? set} style={child.css} />
					{ :else if child.type === 'textarea' }
						<Input type='textarea' value={child.value} name={child.name} placeholder={child.placeholder} set={child.set ?? set} style={child.css} />
					{ :else if child.type === 'date' && child.value !== undefined }
						<div>
							<Date value={child.value} set={child.set ?? set} />
							<Time value={child.value} set={child.set ?? set} />
						</div>
					{ :else if child.type === 'color' && child.value !== undefined }
						<Color value={child.value} on:change={child.set ?? set} />
					{ :else if child.type === 'colors' }
						<Colors set={v => {
							child.set(v) ?? set;
							dispatch('close');
						}} />
					{ :else if child.type === 'email' }
						<Input type='email' value={child.value} name={child.name} placeholder={child.placeholder} set={child.set ?? set} style={child.css} />
					{ :else if child.type === 'password' }
						<Input type='password' value={child.value} name={child.name} placeholder={child.placeholder} set={child.set ?? set} style={child.css} />
					{ /if }

				{ /if }
			{ /each }
		</div>
	</main>
{ :else }
	<svelte:self bind:menu={menu.children[show]} on:close={() => show = -1} />
{ /if }

<style>
	main {
		padding: 0.5rem;
		display: flex;
		flex-flow: row;
		align-items: center;
		height: unset;
		background: var(--neutral);
	}

	h3 {
		width: 10rem;
		margin: 0;
		cursor: pointer;
		user-select: none;
		white-space: nowrap;
	}

	p {
		width: 10rem;
		white-space: nowrap;
	}

	.items {
		display: flex;
		flex-flow: column;
		gap: 0.5rem;
	}

	.title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	button {
		width: auto;
	}

	.description {
		margin-left: 0.5rem;
	}
</style>