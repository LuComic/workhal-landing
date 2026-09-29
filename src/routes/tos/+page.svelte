<script lang="ts">
	import LegalDocument from '$lib/components/LegalDocument.svelte';
	import documents from '$lib/legal/tos.json';
	import { getLocale } from '$lib/paraglide/runtime.js';
</script>

<LegalDocument document={documents[getLocale()]} path="/tos" />
