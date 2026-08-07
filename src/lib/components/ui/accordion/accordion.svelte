<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';

	let { class: className = '', children, ...restProps }: AccordionPrimitive.RootProps = $props();
</script>

<AccordionPrimitive.Root class={`accordion-root ${className}`} {...restProps}>
	{@render children?.()}
</AccordionPrimitive.Root>
