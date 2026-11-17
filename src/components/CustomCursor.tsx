import React, { useEffect, useRef, useState } from 'react';
import { isInteractiveTarget } from '../utils/customCursor';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const syncCapability = () => {
      const finePointer = mediaQuery.matches;
      setIsEnabled(finePointer);
      if (finePointer) {
        document.body.classList.add('has-food-cursor');
      } else {
        document.body.classList.remove('has-food-cursor');
        setIsVisible(false);
      }
    };

    syncCapability();
    mediaQuery.addEventListener('change', syncCapability);

    return () => {
      mediaQuery.removeEventListener('change', syncCapability);
      document.body.classList.remove('has-food-cursor');
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const updateTransform = () => {
      rafRef.current = null;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
    };

    const schedulePositionUpdate = (x: number, y: number) => {
      posRef.current.x = x;
      posRef.current.y = y;
      if (cursorRef.current && rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(updateTransform);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse') {
        setIsVisible(false);
        return;
      }

      const target = e.target as Element | null;
      if (target?.tagName === 'IFRAME') {
        setIsVisible(false);
        return;
      }

      schedulePositionUpdate(e.clientX, e.clientY);
      setIsVisible(true);
      setIsHoveringInteractive(isInteractiveTarget(target));
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      setIsPressed(true);
    };

    const handlePointerUp = () => {
      setIsPressed(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsPressed(false);
    };

    const handleScroll = () => {
      if (posRef.current.x < 0 || posRef.current.y < 0) return;
      const underCursor = document.elementFromPoint(posRef.current.x, posRef.current.y);
      if (underCursor?.tagName === 'IFRAME') {
        setIsVisible(false);
        return;
      }
      setIsHoveringInteractive(isInteractiveTarget(underCursor));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      data-testid="custom-food-cursor"
      data-cursor-mode={isHoveringInteractive ? 'taameya-sandwich' : 'bitten-taameya'}
      aria-hidden="true"
      className={`fixed top-0 left-0 z-[9999] pointer-events-none select-none will-change-transform transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      {/* Offset slightly so the center-top of the food sits cleanly at the click point */}
      <div
        className={`relative w-12 h-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-150 ease-out ${
          isPressed ? 'scale-75 -rotate-12' : isHoveringInteractive ? 'scale-110' : 'scale-100'
        }`}
      >
        {/* Subtle warm aura behind Taameya sandwich on clickable hover */}
        <div
          className={`absolute inset-1 rounded-full bg-[#caa85d]/25 blur-md transition-opacity duration-200 ${
            isHoveringInteractive ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Default State: Bitten Taameya Patty (قرص طعمية متاكل منه حتة) */}
        <div
          className={`relative transition-all duration-200 ease-out ${
            isHoveringInteractive
              ? 'opacity-0 scale-50 rotate-12'
              : 'opacity-100 scale-100 rotate-0'
          }`}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]"
          >
            <defs>
              <radialGradient id="bittenTaameyaCrust" cx="38%" cy="56%" r="65%">
                <stop offset="0%" stopColor="#d9973e" />
                <stop offset="55%" stopColor="#a8641e" />
                <stop offset="90%" stopColor="#6f3e10" />
                <stop offset="100%" stopColor="#4f2908" />
              </radialGradient>
              <linearGradient id="bittenTaameyaInside" x1="20" y1="7" x2="32" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6eb33e" />
                <stop offset="100%" stopColor="#437a20" />
              </linearGradient>
            </defs>

            {/* Horizontally mirrored around x=20 so the bite notch is on the left side */}
            <g transform="translate(40 0) scale(-1 1)">
              {/* Crispy golden-brown outer patty body with 3-tooth bite notch on top-left */}
              <path
                d="M21.5 6.1 Q20.0 10.8 23.6 12.2 Q23.2 16.4 27.6 16.6 Q29.2 20.8 33.9 21.5 A14 14 0 1 1 21.5 6.1 Z"
                fill="url(#bittenTaameyaCrust)"
                stroke="#dfc57d"
                strokeWidth="1.15"
              />

              {/* Exposed herb-green taameya interior along the bitten rim */}
              <path
                d="M21.5 6.5 Q20.0 10.8 23.6 12.2 Q23.2 16.4 27.6 16.6 Q29.2 20.8 33.5 21.4 C30.5 22.1 26.8 20.5 24.4 17.9 C21.8 15.1 20.4 11.1 21.5 6.5 Z"
                fill="url(#bittenTaameyaInside)"
                stroke="#356117"
                strokeWidth="0.7"
              />

              {/* Herb/fava flecks inside the green bitten cross-section */}
              <circle cx="22.1" cy="11.2" r="0.7" fill="#b4ec7c" />
              <circle cx="25.2" cy="15.8" r="0.8" fill="#d9f5b6" />
              <circle cx="29.4" cy="19.3" r="0.65" fill="#9ee05e" />

              {/* Golden fried texture & green herb hints peeking through crust */}
              <circle cx="14.5" cy="15.2" r="1.4" fill="#5e9632" fillOpacity="0.55" />
              <circle cx="11.8" cy="23.5" r="1.6" fill="#5e9632" fillOpacity="0.5" />
              <circle cx="22.4" cy="27.2" r="1.5" fill="#5e9632" fillOpacity="0.5" />
              <circle cx="17.2" cy="20.6" r="1.1" fill="#f3be6d" fillOpacity="0.4" />

              {/* Crispy toasted white sesame seeds (سمسم) */}
              <ellipse cx="14.8" cy="11.5" rx="1.5" ry="0.85" transform="rotate(-25 14.8 11.5)" fill="#fff5d6" />
              <ellipse cx="10.6" cy="17.8" rx="1.4" ry="0.8" transform="rotate(35 10.6 17.8)" fill="#fde8b0" />
              <ellipse cx="18.2" cy="17.6" rx="1.55" ry="0.85" transform="rotate(14 18.2 17.6)" fill="#fff7df" />
              <ellipse cx="14.2" cy="26.4" rx="1.45" ry="0.8" transform="rotate(-40 14.2 26.4)" fill="#fff5d6" />
              <ellipse cx="20.5" cy="23.8" rx="1.5" ry="0.85" transform="rotate(28 20.5 23.8)" fill="#fde8b0" />
              <ellipse cx="26.8" cy="25.2" rx="1.4" ry="0.8" transform="rotate(-18 26.8 25.2)" fill="#fff7df" />
              <ellipse cx="17.6" cy="30.2" rx="1.35" ry="0.75" transform="rotate(10 17.6 30.2)" fill="#fde8b0" />

              {/* Two tiny crispy crumbs near the bite mark */}
              <circle cx="28.6" cy="10.2" r="1.25" fill="#d9973e" stroke="#dfc57d" strokeWidth="0.5" />
              <circle cx="32.2" cy="13.4" r="0.95" fill="#6eb33e" stroke="#d9973e" strokeWidth="0.5" />
            </g>
          </svg>
        </div>

        {/* Interactive Hover State: Egyptian Taameya Sandwich (ساندويتش طعمية) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out ${
            isHoveringInteractive
              ? 'opacity-100 scale-100 rotate-0'
              : 'opacity-0 scale-50 -rotate-12'
          }`}
        >
          <svg
            width="42"
            height="42"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_5px_10px_rgba(0,0,0,0.75)]"
          >
            <defs>
              <linearGradient id="pitaBreadGrad" x1="12" y1="22" x2="36" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f3d494" />
                <stop offset="55%" stopColor="#deb062" />
                <stop offset="100%" stopColor="#b98334" />
              </linearGradient>
              <radialGradient id="taameyaPattyGrad" cx="42%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#85a947" />
                <stop offset="55%" stopColor="#4f7c2c" />
                <stop offset="100%" stopColor="#8e5820" />
              </radialGradient>
            </defs>

            {/* Back half of pita / baladi bread lip */}
            <path
              d="M9.5 22.5C9.5 13.8 16.5 8.5 24 8.5C31.5 8.5 38.5 13.8 38.5 22.5L36 28H12L9.5 22.5Z"
              fill="#c99342"
              stroke="#dfc57d"
              strokeWidth="1"
            />

            {/* Fresh green lettuce / arugula poking out */}
            <path
              d="M12.5 21C11.5 16.5 15 13.5 18 15.5C19.5 12.5 24.5 12 26.5 15C29 12.5 34.5 14 35.2 18.5C37 19.5 36.5 22.5 34 23.5H13.5L12.5 21Z"
              fill="#3fb950"
              stroke="#207731"
              strokeWidth="1"
            />

            {/* Tomato slice peek */}
            <path
              d="M27.5 18.5C29 14.5 34.2 14.2 35.8 18.2C36.4 19.8 35.2 22 33.4 22.5H27.5V18.5Z"
              fill="#ef4444"
              stroke="#991b1b"
              strokeWidth="0.9"
            />

            {/* Golden-green Crispy Taameya Patties (أقراص طعمية بالسمسم) */}
            <ellipse
              cx="18.5"
              cy="20.2"
              rx="6.8"
              ry="5.4"
              fill="url(#taameyaPattyGrad)"
              stroke="#c48a3a"
              strokeWidth="1.2"
            />
            <ellipse
              cx="28.5"
              cy="21.4"
              rx="6.6"
              ry="5.1"
              fill="url(#taameyaPattyGrad)"
              stroke="#c48a3a"
              strokeWidth="1.2"
            />

            {/* White toasted sesame seeds (سمسم) on the Taameya */}
            <circle cx="16.5" cy="18.6" r="0.9" fill="#fef3c7" />
            <circle cx="19.8" cy="17.8" r="0.85" fill="#fef3c7" />
            <circle cx="18.2" cy="20.4" r="0.9" fill="#fef3c7" />
            <circle cx="21.2" cy="20.1" r="0.8" fill="#fef3c7" />
            <circle cx="26.5" cy="19.6" r="0.9" fill="#fef3c7" />
            <circle cx="29.8" cy="19.1" r="0.85" fill="#fef3c7" />
            <circle cx="28.2" cy="21.5" r="0.85" fill="#fef3c7" />
            <circle cx="31.3" cy="21.1" r="0.8" fill="#fef3c7" />

            {/* Tahini drizzle */}
            <path
              d="M15 21.8C17.2 20.6 19.4 22.7 21.8 21.5C24.2 20.3 26.5 22.6 29.2 21.6"
              stroke="#fbf3dc"
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            {/* Front Pita / Baladi Sandwich Pocket */}
            <path
              d="M9.5 22.5C14.8 24.4 33.2 24.4 38.5 22.5C38.1 33.8 31.8 41.2 24 41.2C16.2 41.2 9.9 33.8 9.5 22.5Z"
              fill="url(#pitaBreadGrad)"
              stroke="#f5e1af"
              strokeWidth="1.2"
            />
            {/* Bread pocket toasted texture spots */}
            <ellipse cx="18" cy="30.5" rx="2.1" ry="1.1" fill="#a87028" fillOpacity="0.45" />
            <ellipse cx="29.5" cy="29.2" rx="1.8" ry="0.95" fill="#a87028" fillOpacity="0.45" />
            <ellipse cx="23.5" cy="35.2" rx="2.4" ry="1.1" fill="#a87028" fillOpacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  );
};
