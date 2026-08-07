<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<span
	aria-hidden="true"
	class={`inline-block shrink-0 rounded-lg bg-contain bg-center bg-no-repeat shadow-sm ${className}`}
	style="background-image: url('/workhal-square.png')"
></span>
