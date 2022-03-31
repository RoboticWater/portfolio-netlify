<script>
	import { onMount } from 'svelte';
	import anime from 'animejs';

	let splotchAnimation, textAnimation;
	let scrollY, innerHeight;
	$: if (scrollY) {
		splotchAnimation.seek(splotchAnimation.duration * (scrollY / innerHeight) * 1.8);
		textAnimation.seek(textAnimation.duration * (scrollY / innerHeight) * 3);
	}

	let midX = 1728 / 2,
		midY = 1117 / 2;
	onMount(() => {
		// anime({
		// 	targets: '.splotches use',
		// 	translateX: (el) => {
		// 		let [_, value] = el
		// 			.getAttribute('transform')
		// 			.match(/translate\((-?\d*\.?\d*),\s-?\d*\.?\d*\)/);
		// 		return [value, value];
		// 	},
		// 	translateY: (el) => {
		// 		let [_, value] = el
		// 			.getAttribute('transform')
		// 			.match(/translate\(-?\d*\.?\d*,\s(-?\d*\.?\d*)\)/);
		// 		return [value, value];
		// 	},
		// 	rotate: (el) => {
		// 		let [_, value] = el.getAttribute('transform').match(/rotate\((-?\d*\.?\d*)\)/);
		// 		return [value, value];
		// 	},
		// 	scale: (el) => {
		// 		let [_, value] = el.getAttribute('transform').match(/scale\((-?\d*\.?\d*)\)/);
		// 		// console.log();
		// 		if (el.className.baseVal.includes('shrink')) value /= 1.5;
		// 		return [0, value];
		// 	},
		// 	// opacity: [1, 0],
		// 	// translateX: 200,
		// 	delay: function (el, i) {
		// 		const match = el
		// 			.getAttribute('transform')
		// 			.match(/translate\((-?\d*\.?\d*),\s(-?\d*\.?\d*)\)/);

		// 		if (match) {
		// 			let [_, x, y] = match;
		// 			// console.log(match, x, y, Math.pow(x - midX, 2), Math.pow(y - midY, 2));
		// 			let dist = Math.sqrt(Math.pow(x - midX, 2) + Math.pow(y - midY, 2));
		// 			return dist * 1.1;
		// 		} else {
		// 			return 0;
		// 		}
		// 	},
		// 	elasticity: 200,
		// 	duration: 150,
		// 	easing: 'easeInOutSine'
		// });
		splotchAnimation = anime({
			targets: '.splotches use',
			translateX: (el) => {
				let [_, value] = el
					.getAttribute('transform')
					.match(/translate\((-?\d*\.?\d*),\s-?\d*\.?\d*\)/);
				return [value, value];
			},
			translateY: (el) => {
				let [_, value] = el
					.getAttribute('transform')
					.match(/translate\(-?\d*\.?\d*,\s(-?\d*\.?\d*)\)/);
				return [value, value];
			},
			rotate: (el) => {
				let [_, value] = el.getAttribute('transform').match(/rotate\((-?\d*\.?\d*)\)/);
				return [value, value];
			},
			scale: (el) => {
				let [_, value] = el.getAttribute('transform').match(/scale\((-?\d*\.?\d*)\)/);
				// console.log();
				if (el.className.baseVal.includes('shrink')) value /= 1.5;
				return [value, 0];
			},
			// opacity: [1, 0],
			// translateX: 200,
			delay: function (el, i) {
				const match = el
					.getAttribute('transform')
					.match(/translate\((-?\d*\.?\d*),\s(-?\d*\.?\d*)\)/);

				if (match) {
					let [_, x, y] = match;
					// console.log(match, x, y, Math.pow(x - midX, 2), Math.pow(y - midY, 2));
					let dist = Math.sqrt(Math.pow(x - midX, 2) + Math.pow(y - midY, 2));
					return dist;
				} else {
					return 0;
				}
			},
			elasticity: 200,
			easing: 'easeInOutSine',
			autoplay: false
		});
		textAnimation = anime({
			targets: '.main-text',
			translateX: ['-50%', '-50%'],
			translateY: ['-50%', '-50%'],
			scale: [1, 0.65],
			opacity: [1, 0],
			elasticity: 200,
			easing: 'easeInOutSine',
			autoplay: false
		});
		setTimeout(() => {
			splotchAnimation.seek(
				splotchAnimation.duration * (window.scrollY / window.innerHeight) * 1.8
			);
			textAnimation.seek(textAnimation.duration * (window.scrollY / window.innerHeight) * 3);
		}, 1);
	});
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="main-graphic">
	<svg
		class="splotches bottom"
		height="100%"
		viewBox="0 0 1728 1117"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<path
				id="shape-1"
				d="M15.7634 1.85559C12.2954 11.3043 8.15317 22.0287 -1.91366 22.2649C-10.2465 22.5011 -8.17533 18.3437 -11.547 10.6902C-14.9187 3.03673 -20.0244 -2.67973 -14.6779 -9.15211C-9.33145 -15.6245 -4.22578 -25.6874 4.58872 -22.3331C9.3204 -20.5531 13.1467 -17.0161 15.2384 -12.4886C17.33 -7.96101 17.5185 -2.80747 15.7634 1.85559Z"
			/>
			<path
				id="shape-2"
				d="M-2.37093 -22.8661C-14.3629 -21.6119 -22.9371 -12.6536 -21.9178 -2.85917C-20.8985 6.93529 -5.78848 24.1354 6.02357 22.9409C17.8356 21.7465 21.9127 2.45612 20.8334 -7.33834C19.7541 -17.1328 9.44112 -24.0605 -2.37093 -22.8661Z"
			/>
			<path
				id="shape-3"
				d="M-18.1448 12.0443C-25.2909 1.39591 -21.425 1.45374 -15.2747 -7.16916C-9.12446 -15.7921 -6.19595 -24.9937 4.28883 -22.6209C7.26224 -21.9213 9.9809 -20.4203 12.1422 -18.2849C14.3035 -16.1495 15.8229 -13.4635 16.531 -10.5257C19.1668 -0.108813 25.727 12.623 15.3008 19.2783C9.88317 22.66 3.33541 23.797 -2.92462 22.443C-9.18465 21.089 -14.6528 17.3531 -18.1448 12.0443Z"
			/>
		</defs>
		<use
			transform="translate(833.7142944335938, 583.5714263916016) rotate(344.5) scale(0.4)"
			href="#shape-1"
			class="fill-pink-200"
		/>
		<use
			transform="translate(799.7142944335938, 552.5714263916016) rotate(337.2) scale(0.38)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(845.7142944335938, 506.57142639160156) rotate(20.5) scale(0.29)"
			href="#shape-1"
			class="fill-pink-200"
		/>
		<use
			transform="translate(834.7142944335938, 479.57142639160156) rotate(142.5) scale(0.49)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(829.7142944335938, 563.5714263916016) rotate(76.9) scale(0.4)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(874.7142944335938, 537.5714263916016) rotate(260.8) scale(0.34)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(812.7142944335938, 516.5714263916016) rotate(284.5) scale(0.43)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(878.7142944335938, 504.57142639160156) rotate(355.4) scale(0.28)"
			href="#shape-1"
			class="fill-rose-500"
		/>

		<use
			transform="translate(798.4285888671875, 241) rotate(91) scale(0.58)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(827.4285888671875, 533.5714263916016) rotate(353.1) scale(0.58)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(868.4285888671875, 395.57142639160156) rotate(111) scale(0.55)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(959.4285888671875, 378.57142639160156) rotate(227.5) scale(0.36)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(944.4285888671875, 350.57142639160156) rotate(189.3) scale(0.47)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(995.4285888671875, 341.1428565979004) rotate(313.1) scale(0.47)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1145.4285888671875, 272.1428565979004) rotate(283.9) scale(0.39)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1160.4285888671875, 250.1428565979004) rotate(278.5) scale(0.47)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1269.4285888671875, 215.1428565979004) rotate(194.7) scale(0.52)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1088.4285888671875, 325) rotate(3.6) scale(0.29)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1157.8571166992188, 317) rotate(134.6) scale(0.36)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1125.8571166992188, 348) rotate(120.1) scale(0.48)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1330.8571166992188, 137) rotate(218.4) scale(0.33)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1297.8571166992188, 54) rotate(218.4) scale(0.36)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1400.2857055664062, 75) rotate(50.9) scale(0.47)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1460.2857055664062, 60) rotate(70.9) scale(0.67)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1490.2857055664062, 1) rotate(7.9) scale(0.97)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1330.2857055664062, 57) rotate(322.1) scale(0.52)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1302.2857055664062, 9) rotate(342.2) scale(0.44)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(918.8571166992188, 497.2857131958008) rotate(265.7) scale(0.3)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(971.8571166992188, 316.57142639160156) rotate(218.4) scale(0.27)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1141.8571166992188, 144) rotate(172.9) scale(0.32)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1217.8571166992188, 133) rotate(40) scale(0.2)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1366.7142944335938, 154) rotate(0) scale(0.26)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1439.7142944335938, 110) rotate(87.3) scale(0.29)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1438.7142944335938, 23) rotate(69.1) scale(0.29)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1345.7142944335938, 20) rotate(240.2) scale(0.29)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1295.7142944335938, 128) rotate(152.9) scale(0.71)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1261.7142944335938, 191) rotate(29.1) scale(0.3)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1204.7142944335938, 248) rotate(171.1) scale(1.02)"
			href="#shape-1"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1397.7142944335938, 12) rotate(351.3) scale(0.89)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1372.7142944335938, 52) rotate(45.5) scale(0.58)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1352.7142944335938, 104) rotate(314.9) scale(0.68)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1310.7142944335938, 89) rotate(231.1) scale(0.53)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1250.7142944335938, 115) rotate(251.2) scale(0.44)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1293.7142944335938, 173) rotate(269.4) scale(1.03)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1231.7142944335938, 174) rotate(345.8) scale(0.7)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1252.7142944335938, 146) rotate(345.8) scale(0.24)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1184.7142944335938, 210) rotate(203.8) scale(0.7)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1220.7142944335938, 214) rotate(165.6) scale(0.41)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1173.7142944335938, 294) rotate(43.6) scale(0.41)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1139.7142944335938, 302) rotate(192.9) scale(0.45)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1105.7142944335938, 305) rotate(149.2) scale(0.45)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1098.7142944335938, 360) rotate(327.6) scale(0.52)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1027.4285888671875, 327.1428565979004) rotate(283.9) scale(0.85)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1063.4285888671875, 335.1428565979004) rotate(329.5) scale(0.39)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(1037.4285888671875, 353.1428565979004) rotate(136.5) scale(0.24)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(978.4285888671875, 389.1428565979004) rotate(47.3) scale(0.29)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(928.4285888671875, 390.1428565979004) rotate(287.6) scale(0.41)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(895.2857055664062, 478.2857131958008) rotate(178.3) scale(0.53)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(919.2857055664062, 438.2857131958008) rotate(69.1) scale(0.24)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(876.2857055664062, 433.2857131958008) rotate(302.1) scale(0.3)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(861.2857055664062, 485.2857131958008) rotate(145.6) scale(0.35)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(803.2857055664062, 487.2857131958008) rotate(220.2) scale(0.38)"
			href="#shape-3"
			class="fill-amber-300"
		/>

		<use
			transform="translate(647.8000030517578, 4) rotate(0) scale(0.61)"
			href="#shape-1"
			class="fill-blue-500"
		/>

		<use
			transform="translate(621.8000030517578, 3) rotate(38.7) scale(0.36)"
			href="#shape-1"
			class="fill-blue-500"
		/>

		<use
			transform="translate(710.8000030517578, 136) rotate(38.7) scale(0.25)"
			href="#shape-1"
			class="fill-blue-500"
		/>

		<use
			transform="translate(679.8000030517578, 119) rotate(69.3) scale(0.74)"
			href="#shape-1"
			class="fill-blue-500"
		/>

		<use
			transform="translate(731.8000030517578, 156) rotate(31.1) scale(0.55)"
			href="#shape-1"
			class="fill-blue-500"
		/>

		<use
			transform="translate(693.3333282470703, 91) rotate(287.8) scale(0.42)"
			href="#shape-1"
			class="fill-blue-500"
		/>

		<use
			transform="translate(738.3333282470703, 225) rotate(340.9) scale(0.47)"
			href="#shape-1"
			class="fill-blue-500"
		/>

		<use
			transform="translate(764.3333282470703, 311) rotate(315.4) scale(0.82)"
			href="#shape-1"
			class="fill-blue-500"
		/>

		<use
			transform="translate(843.3333282470703, 322) rotate(238.9) scale(0.43)"
			href="#shape-1"
			class="fill-blue-500"
		/>

		<use
			transform="translate(893.3333282470703, 397) rotate(13.8) scale(0.45)"
			href="#shape-1"
			class="fill-blue-500"
		/>

		<use
			transform="translate(584.3333282470703, 21) rotate(13.8) scale(0.22)"
			href="#shape-2"
			class="fill-blue-500"
		/>

		<use
			transform="translate(776.3333282470703, -2) rotate(13.8) scale(0.22)"
			href="#shape-2"
			class="fill-blue-500"
		/>

		<use
			transform="translate(784.3333282470703, 69) rotate(62.6) scale(0.26)"
			href="#shape-2"
			class="fill-blue-500"
		/>

		<use
			transform="translate(718.3333282470703, 114) rotate(62.6) scale(0.26)"
			href="#shape-2"
			class="fill-blue-500"
		/>

		<use
			transform="translate(751.3333282470703, 134) rotate(336.6) scale(0.26)"
			href="#shape-2"
			class="fill-blue-500"
		/>

		<use
			transform="translate(737.3333282470703, 182) rotate(336.6) scale(0.31)"
			href="#shape-2"
			class="fill-blue-500"
		/>

		<use
			transform="translate(762.3333282470703, 204) rotate(58.4) scale(0.34)"
			href="#shape-2"
			class="fill-blue-500"
		/>

		<use
			transform="translate(727.3333282470703, 264) rotate(20.1) scale(0.79)"
			href="#shape-2"
			class="fill-blue-500"
		/>

		<use
			transform="translate(918.3333282470703, 167) rotate(209.2) scale(0.2)"
			href="#shape-2"
			class="fill-blue-500"
		/>

		<use
			transform="translate(808.3333282470703, 328) rotate(45.6) scale(0.31)"
			href="#shape-2"
			class="fill-blue-500"
		/>

		<use
			transform="translate(810.3333282470703, 366) rotate(296.2) scale(0.57)"
			href="#shape-2"
			class="fill-blue-500"
		/>

		<use
			transform="translate(827.3333282470703, 411) rotate(130.6) scale(0.43)"
			href="#shape-2"
			class="fill-blue-500"
		/>
		<use
			transform="translate(642, 42) rotate(97.4) scale(1)"
			href="#shape-1"
			class="fill-blue-500"
		/>
		<use
			transform="translate(705, 10) rotate(3.1) scale(0.23)"
			href="#shape-1"
			class="fill-blue-500"
		/>
		<use
			transform="translate(799, 422) rotate(249) scale(0.23)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(888, 364) rotate(249) scale(0.57)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(831, 287) rotate(79) scale(0.41)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(766, 268) rotate(151.3) scale(0.41)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(789, 222) rotate(140.6) scale(0.34)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(816, 220) rotate(257.5) scale(0.3)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(841, 225) rotate(40.8) scale(0.48)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(830, 186) rotate(106.7) scale(0.78)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(790, 182) rotate(327.5) scale(0.52)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(764, 166) rotate(121.5) scale(0.39)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(698, 64) rotate(85.4) scale(0.64)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(779, 94) rotate(15.3) scale(0.34)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(684, 32) rotate(96) scale(0.46)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(649, 78) rotate(327.5) scale(0.22)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(682, -6) rotate(134.3) scale(0.57)"
			href="#shape-3"
			class="fill-blue-500"
		/>
		<use
			transform="translate(1109.2857055664062, 334.2857131958008) rotate(52.7) scale(0.27)"
			href="#shape-2"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(1115.2857055664062, 385.2857131958008) rotate(127.3) scale(0.27)"
			href="#shape-2"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(1088.2857055664062, 412.2857131958008) rotate(80) scale(0.33)"
			href="#shape-2"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(1027.2857055664062, 466.2857131958008) rotate(182) scale(0.29)"
			href="#shape-2"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(1030.2857055664062, 453.2857131958008) rotate(236.6) scale(0.24)"
			href="#shape-2"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(1023.2857055664062, 376.2857131958008) rotate(34.5) scale(0.2)"
			href="#shape-2"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(984.2857055664062, 459.2857131958008) rotate(0) scale(0.32)"
			href="#shape-2"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(943.2857055664062, 495.2857131958008) rotate(47.2) scale(0.29)"
			href="#shape-2"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(981.2857055664062, 481.2857131958008) rotate(263.9) scale(0.27)"
			href="#shape-2"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(900.2857055664062, 546.5714263916016) rotate(63.6) scale(0.27)"
			href="#shape-2"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(940.2857055664062, 551.5714263916016) rotate(293) scale(0.32)"
			href="#shape-2"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(1037.2857055664062, 383.42857360839844) rotate(260.2) scale(0.36)"
			href="#shape-3"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(1003.2857055664062, 410.42857360839844) rotate(227.5) scale(0.61)"
			href="#shape-3"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(963.2857055664062, 408.42857360839844) rotate(60) scale(0.45)"
			href="#shape-3"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(956.2857055664062, 442.42857360839844) rotate(89.1) scale(0.45)"
			href="#shape-3"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(853.2857055664062, 524.7142944335938) rotate(187.4) scale(0.38)"
			href="#shape-3"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(851.2857055664062, 561.7142944335938) rotate(101.9) scale(0.47)"
			href="#shape-3"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(851.2857055664062, 703.8571472167969) rotate(287.6) scale(0.24)"
			href="#shape-1"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(902.2857055664062, 520.7142944335938) rotate(262.1) scale(0.56)"
			href="#shape-1"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(941.7142944335938, 420.57142639160156) rotate(51.4) scale(0.29)"
			href="#shape-1"
			class="fill-emerald-400"
		/>
	</svg>
	<svg
		class="main-text"
		height="100%"
		viewBox="0 0 1728 1117"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<text
			transform="translate(864, 458.5)"
			font-size="130"
			text-anchor="middle"
			class="text fill-zinc-800">Research</text
		>
		<text
			transform="translate(864, 598.5)"
			font-size="130"
			text-anchor="middle"
			class="text fill-zinc-800">Development</text
		>
		<text
			transform="translate(864, 738.5)"
			font-size="130"
			text-anchor="middle"
			class="text fill-zinc-800">Design</text
		>
	</svg>
	<svg
		class="splotches top"
		height="100%"
		viewBox="0 0 1728 1117"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<path
				id="shape-1"
				d="M15.7634 1.85559C12.2954 11.3043 8.15317 22.0287 -1.91366 22.2649C-10.2465 22.5011 -8.17533 18.3437 -11.547 10.6902C-14.9187 3.03673 -20.0244 -2.67973 -14.6779 -9.15211C-9.33145 -15.6245 -4.22578 -25.6874 4.58872 -22.3331C9.3204 -20.5531 13.1467 -17.0161 15.2384 -12.4886C17.33 -7.96101 17.5185 -2.80747 15.7634 1.85559Z"
			/>
			<path
				id="shape-2"
				d="M-2.37093 -22.8661C-14.3629 -21.6119 -22.9371 -12.6536 -21.9178 -2.85917C-20.8985 6.93529 -5.78848 24.1354 6.02357 22.9409C17.8356 21.7465 21.9127 2.45612 20.8334 -7.33834C19.7541 -17.1328 9.44112 -24.0605 -2.37093 -22.8661Z"
			/>
			<path
				id="shape-3"
				d="M-18.1448 12.0443C-25.2909 1.39591 -21.425 1.45374 -15.2747 -7.16916C-9.12446 -15.7921 -6.19595 -24.9937 4.28883 -22.6209C7.26224 -21.9213 9.9809 -20.4203 12.1422 -18.2849C14.3035 -16.1495 15.8229 -13.4635 16.531 -10.5257C19.1668 -0.108813 25.727 12.623 15.3008 19.2783C9.88317 22.66 3.33541 23.797 -2.92462 22.443C-9.18465 21.089 -14.6528 17.3531 -18.1448 12.0443Z"
			/>
		</defs>
		<use
			transform="translate(891, 73) rotate(289.3) scale(0.46)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(922, 85) rotate(271.2) scale(0.42)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(900, 117) rotate(191.1) scale(0.42)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(828, 114) rotate(318.5) scale(0.18)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(880, 215) rotate(334.9) scale(0.3)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(825, 258) rotate(152.9) scale(0.3)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(956, 38) rotate(251.2) scale(0.21)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(858, 349) rotate(40) scale(0.44)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(971, -3) rotate(40) scale(0.44)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(897, 37) rotate(320.3) scale(0.44)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(971, 25) rotate(240.2) scale(0.29)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(944, -3) rotate(240.2) scale(0.29)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(962, 71) rotate(174.7) scale(0.61)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(834, 87) rotate(174.7) scale(0.3)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(904, 144) rotate(0) scale(0.3)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(945, 153) rotate(45.5) scale(0.26)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(858, 271) rotate(45.5) scale(0.32)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(759, 240) rotate(254.8) scale(0.24)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(791, 156) rotate(360) scale(0.27)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(804, 283) rotate(360) scale(0.24)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(877, 300) rotate(171.1) scale(0.26)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(890, 322) rotate(182) scale(0.68)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(845, 137) rotate(18.1) scale(0.86)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(873, 167) rotate(171.1) scale(1.02)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(805, 135) rotate(269.4) scale(0.62)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(899, 191) rotate(342.2) scale(0.5)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(877, 250) rotate(318.5) scale(0.85)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(870, 104) rotate(101.9) scale(0.45)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(862, 32) rotate(209.3) scale(0.41)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(822, 60) rotate(231.1) scale(0.24)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(930, 23) rotate(187.5) scale(0.61)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(937, 55) rotate(65.5) scale(0.5)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(911, 338) rotate(200.2) scale(0.36)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(792, 303) rotate(49.1) scale(0.48)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(852.7142944335938, 422.8571472167969) rotate(55.1) scale(0.56)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(821.7142944335938, 453.8571472167969) rotate(78.7) scale(0.28)"
			href="#shape-1"
			class="fill-rose-500"
		/>
		<use
			transform="translate(786.7142944335938, 452.57142639160156) rotate(166.1) scale(0.47)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(872.7142944335938, 462.57142639160156) rotate(224.4) scale(0.22)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(935.7142944335938, 465.57142639160156) rotate(360) scale(0.28)"
			href="#shape-2"
			class="fill-rose-500"
		/>
		<use
			transform="translate(823.7142944335938, 593.5714263916016) rotate(31.4) scale(0.29)"
			href="#shape-3"
			class="fill-rose-500"
		/>
		<use
			transform="translate(866.7142944335938, 575.5714263916016) rotate(273.5) scale(0.29)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(795.7142944335938, 640.5714263916016) rotate(350) scale(0.52)"
			href="#shape-1"
			class="fill-pink-200 shrink"
		/>
		<use
			transform="translate(773.7142944335938, 712.8571472167969) rotate(138.8) scale(0.49)"
			href="#shape-1"
			class="fill-pink-200"
		/>
		<use
			transform="translate(823.7142944335938, 763.1428527832031) rotate(244.4) scale(0.49)"
			href="#shape-1"
			class="fill-pink-200"
		/>
		<use
			transform="translate(794.7142944335938, 900.5714111328125) rotate(44.1) scale(0.49)"
			href="#shape-1"
			class="fill-pink-200"
		/>
		<use
			transform="translate(758.7142944335938, 962.5714111328125) rotate(118.8) scale(1.34)"
			href="#shape-1"
			class="fill-pink-200"
		/>
		<use
			transform="translate(811.7142944335938, 853.5714111328125) rotate(206.2) scale(0.82)"
			href="#shape-1"
			class="fill-pink-200"
		/>
		<use
			transform="translate(836.7142944335938, 805.4285888671875) rotate(346.3) scale(0.64)"
			href="#shape-1"
			class="fill-pink-200"
		/>
		<use
			transform="translate(788.7142944335938, 829.4285888671875) rotate(337.2) scale(0.53)"
			href="#shape-1"
			class="fill-pink-200"
		/>
		<use
			transform="translate(847.7142944335938, 776.4285888671875) rotate(300.8) scale(0.4)"
			href="#shape-1"
			class="fill-pink-200"
		/>
		<use
			transform="translate(751.7142944335938, 925.8571166992188) rotate(231.7) scale(0.4)"
			href="#shape-1"
			class="fill-pink-200"
		/>
		<use
			transform="translate(854.7142944335938, 649.4285583496094) rotate(279) scale(0.4)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(786.7142944335938, 616.4285583496094) rotate(96.9) scale(0.31)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(805.7142944335938, 664.4285583496094) rotate(96.9) scale(0.26)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(829.7142944335938, 665.4285583496094) rotate(78.7) scale(0.19)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(818.7142944335938, 905.8571166992188) rotate(313.6) scale(0.19)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(787.7142944335938, 742.5714111328125) rotate(279) scale(0.67)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(796.7142944335938, 779.5714111328125) rotate(340.9) scale(0.5)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(851.7142944335938, 863.5714111328125) rotate(204.3) scale(1.16)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(767.7142944335938, 875.5714111328125) rotate(166.1) scale(0.52)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(761.7142944335938, 794.5714111328125) rotate(13.2) scale(0.34)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(802.7142944335938, 703.5714111328125) rotate(289.9) scale(0.52)"
			href="#shape-3"
			class="fill-pink-200"
		/>
		<use
			transform="translate(758.7142944335938, 688.5714111328125) rotate(25.9) scale(0.28)"
			href="#shape-2"
			class="fill-pink-200"
		/>
		<use
			transform="translate(818.7142944335938, 611.5714111328125) rotate(291.7) scale(0.34)"
			href="#shape-2"
			class="fill-pink-200"
		/>
		<use
			transform="translate(700.7142944335938, 719.5714111328125) rotate(333.6) scale(0.22)"
			href="#shape-2"
			class="fill-pink-200"
		/>
		<use
			transform="translate(716.7142944335938, 759.5714111328125) rotate(177) scale(0.19)"
			href="#shape-2"
			class="fill-pink-200"
		/>
		<use
			transform="translate(756.7142944335938, 759.5714111328125) rotate(155.2) scale(0.19)"
			href="#shape-2"
			class="fill-pink-200"
		/>
		<use
			transform="translate(808.7142944335938, 806.5714111328125) rotate(71.5) scale(0.2)"
			href="#shape-2"
			class="fill-pink-200"
		/>
		<use
			transform="translate(860.7142944335938, 801.5714111328125) rotate(235.3) scale(0.2)"
			href="#shape-2"
			class="fill-pink-200"
		/>
		<use
			transform="translate(857.7142944335938, 827.5714111328125) rotate(115.1) scale(0.22)"
			href="#shape-2"
			class="fill-pink-200"
		/>
		<use
			transform="translate(819.7142944335938, 879.5714111328125) rotate(27.8) scale(0.32)"
			href="#shape-2"
			class="fill-pink-200"
		/>
		<use
			transform="translate(742.7142944335938, 990.8571166992188) rotate(27.8) scale(0.31)"
			href="#shape-2"
			class="fill-pink-200"
		/>
		<use
			transform="translate(756.7142944335938, 825.8571166992188) rotate(162.5) scale(0.31)"
			href="#shape-2"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(725.7142944335938, 1017.8571166992188) rotate(193.4) scale(0.31)"
			href="#shape-2"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(749.7142944335938, 1099.8571166992188) rotate(237.1) scale(0.31)"
			href="#shape-2"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(691.7142944335938, 1037.8571166992188) rotate(304.5) scale(0.52)"
			href="#shape-3"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(750.7142944335938, 1011.8571166992188) rotate(360) scale(0.46)"
			href="#shape-3"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(769.7142944335938, 909.8571166992188) rotate(147.9) scale(0.44)"
			href="#shape-3"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(811.7142944335938, 933.8571166992188) rotate(317.2) scale(0.41)"
			href="#shape-3"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(723.7142944335938, 1060.8571166992188) rotate(98.8) scale(0.41)"
			href="#shape-3"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(710.7142944335938, 1099.8571166992188) rotate(299) scale(1.07)"
			href="#shape-3"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(806.7142944335938, 963.8571166992188) rotate(35) scale(0.23)"
			href="#shape-3"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(745.7142944335938, 1038.8571166992188) rotate(222.6) scale(0.57)"
			href="#shape-1"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(673.7142944335938, 1108.8571166992188) rotate(167.9) scale(0.75)"
			href="#shape-1"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(789.7142944335938, 928.8571166992188) rotate(142.5) scale(0.37)"
			href="#shape-1"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(853.7142944335938, 910.8571166992188) rotate(200.7) scale(0.58)"
			href="#shape-1"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(782.7142944335938, 1000.8571166992188) rotate(351.8) scale(0.58)"
			href="#shape-1"
			class="fill-zinc-800"
		/>
		<use
			transform="translate(851.7142944335938, 617.2857055664062) rotate(80.6) scale(0.31)"
			href="#shape-3"
			class="fill-amber-300"
		/>
		<use
			transform="translate(762.8571166992188, 644.5714263916016) rotate(54.5) scale(0.24)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(776.8571166992188, 677.8571472167969) rotate(289.4) scale(0.23)"
			href="#shape-2"
			class="fill-amber-300"
		/>

		<use
			transform="translate(730.8571166992188, 656.8571472167969) rotate(112.8) scale(0.23)"
			href="#shape-2"
			class="fill-amber-300"
		/>
		<use
			transform="translate(864.2857055664062, 599.7142944335938) rotate(136.5) scale(0.52)"
			href="#shape-3"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(826.2857055664062, 638) rotate(96.4) scale(0.38)"
			href="#shape-3"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(873.2857055664062, 630.8571472167969) rotate(347.6) scale(0.33)"
			href="#shape-1"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(889.2857055664062, 648.8571472167969) rotate(38.1) scale(0.47)"
			href="#shape-1"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(836.2857055664062, 682) rotate(236.6) scale(0.38)"
			href="#shape-3"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(884.2857055664062, 676.8571472167969) rotate(96.4) scale(0.52)"
			href="#shape-1"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(866.2857055664062, 728) rotate(41.8) scale(0.47)"
			href="#shape-3"
			class="fill-emerald-400"
		/>
		<use
			transform="translate(841.2857055664062, 740) rotate(282.1) scale(0.45)"
			href="#shape-3"
			class="fill-emerald-400"
		/>
	</svg>
</div>

<style>
	.main-graphic {
		position: relative;
		display: inline-block;
	}
	.text {
		/* font-size: 7.75rem; */
		font-family: 'Times New Roman', serif;
		font-style: italic;
		text-transform: uppercase;
		font-weight: bold;
	}
	div {
		width: 100vw;
	}
	svg {
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	@media screen and (max-aspect-ratio: 920/873) {
		.main-text {
			width: 150vw;
		}
	}
	/* 
	svg {
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	svg:first-child {
		top: 0;
		left: 0;
		position: relative;
		transform: none;
	}

	@media screen and (max-width: 960px) {
		.shrink {
			display: none;
		}
	} */
</style>
