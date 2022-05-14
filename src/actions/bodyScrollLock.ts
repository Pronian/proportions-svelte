import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export function bodyScrollLock(el: HTMLElement, lock: boolean) {
	let isLocked = false;
	if (lock) {
		disableBodyScroll(el);
		isLocked = true;
	}

	return {
		update(newLock: boolean) {
			if (isLocked && !newLock) {
				enableBodyScroll(el);
				isLocked = false;
			} else if (!isLocked && newLock) {
				disableBodyScroll(el);
				isLocked = true;
			}
		},
		destroy() {
			if (isLocked) {
				enableBodyScroll(el);
			}
		}
	};
}
