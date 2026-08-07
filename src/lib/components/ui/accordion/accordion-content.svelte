<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';

	let {
		class: className = '',
		children,
		forceMount = true,
		...restProps
	}: AccordionPrimitive.ContentProps = $props();
</script>

<AccordionPrimitive.Content {forceMount} class={`accordion-content ${className}`} {...restProps}>
	<div class="accordion-content-inner">
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>
