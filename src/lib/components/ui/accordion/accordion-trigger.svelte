<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import { ChevronDown } from '@lucide/svelte';

	let { class: className = '', children, ...restProps }: AccordionPrimitive.TriggerProps = $props();
</script>

<AccordionPrimitive.Header class="accordion-header" level={3}>
	<AccordionPrimitive.Trigger class={`accordion-trigger ${className}`} {...restProps}>
		<span>{@render children?.()}</span>
		<ChevronDown size={20} strokeWidth={2} aria-hidden="true" />
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
