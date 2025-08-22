export async function loadProducts() {
	try {
		const res = await fetch('models/products.json', { cache: 'no-store' });
		if (!res.ok) throw new Error('Failed to load products.json');
		return await res.json();
	} catch (err) {
		console.error(err);
		return { categories: [], products: [] };
	}
}

export function navigateTo(url) {
	window.location.href = url;
}

export function initSlider(indicatorsSelector) {
	const indicators = document.querySelectorAll(indicatorsSelector);
	if (!indicators.length) return;
	let active = 0;
	setInterval(() => {
		indicators[active].classList.remove('active');
		active = (active + 1) % indicators.length;
		indicators[active].classList.add('active');
	}, 3000);
}
