<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';

	let { class: className = '', children, ...restProps }: AccordionPrimitive.ItemProps = $props();
</script>

<AccordionPrimitive.Item class={`accordion-item ${className}`} {...restProps}>
	{@render children?.()}
</AccordionPrimitive.Item>
