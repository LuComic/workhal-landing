import { animate, inView, scroll, stagger } from 'motion';

const editorialEase = [0.22, 1, 0.36, 1] as const;
const livelyEase = [0.16, 1.16, 0.3, 1] as const;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type EntranceOptions = {
	selector?: string;
	delay?: number;
	staggerBy?: number;
	distance?: number;
	variant?: 'editorial' | 'card';
};

export function entrance(node: HTMLElement, options: EntranceOptions = {}) {
	const {
		selector = '[data-motion-item]',
		delay = 0,
		staggerBy = 0.055,
		distance = 20,
		variant = 'editorial'
	} = options;
	const items = Array.from(node.querySelectorAll<HTMLElement>(selector));
	const targets = items.length ? items : [node];

	if (reducedMotion()) return;

	for (const item of targets) {
		const clipped = variant === 'card';
		item.style.opacity = '0';
		item.style.transform = `translateY(${distance}px) scale(${variant === 'card' ? 0.975 : 1})`;
		item.style.transformOrigin = '50% 100%';
		if (clipped) item.style.clipPath = 'inset(0 0 20% 0)';
	}

	const stop = inView(
		node,
		() => {
			targets.forEach((item, index) => {
				const clipped = variant === 'card';
				animate(
					item,
					{
						opacity: 1,
						y: 0,
						scale: 1,
						...(clipped ? { clipPath: 'inset(0 0 0% 0)' } : {})
					},
					{
						duration: variant === 'card' ? 0.76 : 0.68,
						delay: delay + index * staggerBy,
						ease: editorialEase
					}
				);
			});
		},
		{ amount: 0.16, margin: '0px 0px -36px' }
	);

	return { destroy: stop };
}

type DecodeCharacter = {
	bottom: number;
	color: string;
	font: string;
	left: number;
	range: Range;
	symbol: '+';
	symbolX: number;
	top: number;
	width: number;
};

type PreparedScramble = {
	canvas: HTMLCanvasElement;
	cleanup: () => void;
	render: (resolvedCharacters: number) => void;
	totalCharacters: number;
};

type HighlightApi = {
	Highlight: new (...ranges: Range[]) => unknown;
	registry: { set: (name: string, highlight: unknown) => void };
};

const hiddenDecodeRanges = new Set<Range>();

function getHighlightApi(): HighlightApi | undefined {
	const Highlight = (window as Window & { Highlight?: HighlightApi['Highlight'] }).Highlight;
	const registry = (CSS as unknown as { highlights?: HighlightApi['registry'] }).highlights;
	if (!Highlight || !registry) return;
	if (!document.querySelector('[data-motion-highlight-styles]')) {
		const styles = document.createElement('style');
		styles.dataset.motionHighlightStyles = '';
		styles.textContent =
			'::highlight(motion-decode-hidden) { color: transparent; text-shadow: none; }';
		document.head.append(styles);
	}
	return { Highlight, registry };
}

function refreshDecodeHighlight(api: HighlightApi) {
	api.registry.set('motion-decode-hidden', new api.Highlight(...hiddenDecodeRanges));
}

function prepareScramble(element: HTMLElement) {
	const elementRect = element.getBoundingClientRect();
	const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
		acceptNode: (textNode) =>
			textNode.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
	});
	const textNodes: Text[] = [];
	while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

	const characters: DecodeCharacter[] = [];
	let characterIndex = 0;
	for (const textNode of textNodes) {
		const parent = textNode.parentElement;
		if (!parent) continue;
		const style = getComputedStyle(parent);
		const font = [
			style.fontStyle === 'normal' ? '' : style.fontStyle,
			style.fontWeight,
			style.fontSize,
			style.fontFamily
		]
			.filter(Boolean)
			.join(' ');
		for (let index = 0; index < textNode.data.length; index += 1) {
			if (/\s/.test(textNode.data[index])) continue;
			const range = document.createRange();
			range.setStart(textNode, index);
			range.setEnd(textNode, index + 1);
			const rect = range.getBoundingClientRect();
			characters.push({
				bottom: rect.bottom - elementRect.top,
				color: style.color,
				font,
				left: rect.left - elementRect.left,
				range,
				symbol: '+',
				symbolX: 0,
				top: rect.top - elementRect.top,
				width: rect.width
			});
			characterIndex += 1;
		}
	}

	const lines: number[][] = [];
	characters.forEach((character, index) => {
		const line = lines.find((candidate) =>
			candidate.some(
				(characterIndex) => Math.abs(characters[characterIndex].top - character.top) < 2
			)
		);
		if (line) line.push(index);
		else lines.push([index]);
	});

	let narrowestSlot = Number.POSITIVE_INFINITY;
	for (const line of lines) {
		line.sort((a, b) => characters[a].left - characters[b].left);
		const lineLeft = Math.min(...line.map((index) => characters[index].left));
		const lineRight = Math.max(
			...line.map((index) => characters[index].left + characters[index].width)
		);
		const slotWidth = (lineRight - lineLeft) / line.length;
		narrowestSlot = Math.min(narrowestSlot, slotWidth);
		line.forEach((characterIndex, slotIndex) => {
			characters[characterIndex].symbolX = lineLeft + slotWidth * (slotIndex + 0.5);
		});
	}

	const canvas = document.createElement('canvas');
	canvas.className = 'motion-scramble-canvas';
	canvas.setAttribute('aria-hidden', 'true');
	const deviceScale = Math.max(1, window.devicePixelRatio || 1);
	canvas.width = Math.ceil(elementRect.width * deviceScale);
	canvas.height = Math.ceil(elementRect.height * deviceScale);
	canvas.style.width = `${elementRect.width}px`;
	canvas.style.height = `${elementRect.height}px`;
	const context = canvas.getContext('2d');
	if (!context) {
		return {
			canvas,
			cleanup: () => {},
			render: () => {},
			totalCharacters: characterIndex
		} satisfies PreparedScramble;
	}
	context.scale(deviceScale, deviceScale);
	if (getComputedStyle(element).position === 'static') element.style.position = 'relative';
	element.append(canvas);

	const highlightApi = getHighlightApi();
	let lastResolved = -1;
	const render = (resolvedCharacters: number) => {
		const resolved = Math.max(0, Math.min(characterIndex, Math.floor(resolvedCharacters)));
		if (highlightApi && resolved !== lastResolved) {
			characters.forEach(({ range }, index) => {
				if (index < resolved) hiddenDecodeRanges.delete(range);
				else hiddenDecodeRanges.add(range);
			});
			refreshDecodeHighlight(highlightApi);
			lastResolved = resolved;
		}
		context.clearRect(0, 0, elementRect.width, elementRect.height);

		for (let index = resolved; index < characters.length; index += 1) {
			const character = characters[index];
			context.fillStyle = character.color;
			context.font = character.font;
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			const symbolWidth = context.measureText(character.symbol).width;
			const symbolScale = Math.min(0.8, (narrowestSlot * 0.72) / symbolWidth);
			context.save();
			context.translate(character.symbolX, character.top + (character.bottom - character.top) / 2);
			context.scale(symbolScale, symbolScale);
			context.fillText(character.symbol, 0, 0);
			context.restore();
		}
	};
	const cleanup = () => {
		if (!highlightApi) return;
		characters.forEach(({ range }) => hiddenDecodeRanges.delete(range));
		refreshDecodeHighlight(highlightApi);
	};

	render(0);

	return { canvas, cleanup, render, totalCharacters: characterIndex } satisfies PreparedScramble;
}

export function textDecode(node: HTMLElement) {
	if (reducedMotion() || !getHighlightApi()) return;

	const decodeTargets = [
		...(node.matches('[data-motion-text]') ? [node] : []),
		...Array.from(node.querySelectorAll<HTMLElement>('[data-motion-text]'))
	];
	const fadeTargets = [
		...(node.matches('[data-motion-fade]') ? [node] : []),
		...Array.from(node.querySelectorAll<HTMLElement>('[data-motion-fade]'))
	];
	const prepared = decodeTargets.map((target) => prepareScramble(target));
	for (const target of fadeTargets) target.style.opacity = '0';

	const controls: Array<ReturnType<typeof animate>> = [];
	const stop = inView(
		node,
		() => {
			if (fadeTargets.length) {
				controls.push(
					animate(
						fadeTargets,
						{ opacity: 1 },
						{
							duration: 0.56,
							delay: stagger(0.05, { startDelay: 0.08 }),
							ease: editorialEase
						}
					)
				);
			}

			prepared.forEach(({ canvas, cleanup, render, totalCharacters }, targetIndex) => {
				controls.push(
					animate(0, totalCharacters, {
						duration: Math.min(1.15, Math.max(0.62, totalCharacters * 0.014)),
						delay: targetIndex * 0.07,
						ease: 'linear',
						onUpdate: (latest) => {
							render(latest);
						},
						onComplete: () => {
							render(totalCharacters);
							cleanup();
							canvas.remove();
						}
					})
				);
			});
		},
		{ amount: 0.18, margin: '0px 0px -44px' }
	);

	return {
		destroy: () => {
			stop();
			controls.forEach((control) => control.stop());
			prepared.forEach(({ canvas, cleanup }) => {
				cleanup();
				canvas.remove();
			});
		}
	};
}

export function screenshotReveal(node: HTMLElement, delay = 0) {
	if (reducedMotion()) return;

	node.style.opacity = '0';
	node.style.clipPath = 'inset(0 0 28% 0)';
	node.style.transform = 'translateY(16px)';

	const stop = inView(
		node,
		() => {
			animate(
				node,
				{
					opacity: 1,
					clipPath: 'inset(0 0 0% 0)',
					y: 0
				},
				{ duration: 0.84, delay, ease: editorialEase }
			);
		},
		{ amount: 0.18, margin: '0px 0px -32px' }
	);

	return { destroy: stop };
}

export function chaosToClarity(node: HTMLElement) {
	if (reducedMotion()) return;

	const scraps = Array.from(node.querySelectorAll<HTMLElement>('.scrap'));
	const scrapStage = node.querySelector<HTMLElement>('.scraps');
	const guide = node.querySelector<HTMLElement>('.comparison-screen');
	for (const item of scraps) item.style.opacity = '0';
	if (guide) {
		guide.style.opacity = '0';
		guide.style.clipPath = 'inset(0 0 36% 0)';
	}

	const scrapStop = inView(
		scrapStage ?? node,
		() => {
			const arrivals = [
				{ x: [96, 0], y: [-48, 0], rotate: [18, 5] },
				{ x: [-82, 0], y: [54, 0], rotate: [-17, -4] },
				{ x: [76, 0], y: [62, 0], rotate: [15, 2] }
			];

			scraps.forEach((scrap, index) => {
				animate(
					scrap,
					{ opacity: 1, ...arrivals[index] },
					{
						duration: 0.72,
						delay: index * 0.07,
						ease: livelyEase
					}
				);
			});
		},
		{ amount: 0.28, margin: '0px 0px -56px' }
	);

	const guideStop = guide
		? inView(
				guide,
				() => {
					animate(
						guide,
						{
							opacity: 1,
							clipPath: 'inset(0 0 0% 0)',
							x: ['9%', '5%']
						},
						{
							duration: 0.94,
							delay: window.matchMedia('(max-width: 760px)').matches ? 0.08 : 0.48,
							ease: editorialEase
						}
					);
				},
				{ amount: 0.22, margin: '0px 0px -48px' }
			)
		: () => {};

	return {
		destroy: () => {
			scrapStop();
			guideStop();
		}
	};
}

export function screenshotScroll(node: HTMLElement) {
	if (reducedMotion()) return;
	const image = node.querySelector('img');
	if (!image) return;

	const movement = animate(image, { y: [14, -14], scaleY: 1.08 }, { duration: 1, ease: 'linear' });
	movement.pause();
	const stop = scroll(movement, {
		target: node,
		offset: ['start end', 'end start']
	});

	return {
		destroy: () => {
			stop();
			movement.stop();
		}
	};
}
