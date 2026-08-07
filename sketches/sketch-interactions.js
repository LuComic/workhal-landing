for (const trigger of document.querySelectorAll('[data-open-dialog]')) {
	trigger.addEventListener('click', () => {
		const dialog = document.getElementById(trigger.dataset.openDialog);
		if (dialog instanceof HTMLDialogElement) dialog.showModal();
	});
}

for (const trigger of document.querySelectorAll('[data-close-dialog]')) {
	trigger.addEventListener('click', () => trigger.closest('dialog')?.close());
}

for (const dialog of document.querySelectorAll('dialog')) {
	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) dialog.close();
	});
}

for (const form of document.querySelectorAll('[data-demo-form]')) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const input = form.querySelector('input');
		const status = form.querySelector('.dialog-status');
		const submit = form.querySelector('[type="submit"]');
		if (!(input instanceof HTMLInputElement) || !input.checkValidity()) {
			input?.reportValidity();
			return;
		}
		if (status) status.textContent = `Thanks — the next step would be sent to ${input.value}.`;
		if (submit instanceof HTMLButtonElement) {
			submit.textContent = 'Request noted ✓';
			submit.disabled = true;
		}
		input.disabled = true;
	});
}

for (const group of document.querySelectorAll('.questions')) {
	const dropdowns = [...group.querySelectorAll('details')];
	for (const dropdown of dropdowns) {
		dropdown.addEventListener('toggle', () => {
			if (!dropdown.open) return;
			for (const other of dropdowns) {
				if (other !== dropdown) other.removeAttribute('open');
			}
		});
	}
}
