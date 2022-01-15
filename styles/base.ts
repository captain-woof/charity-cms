import { createGlobalStyle, css } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    ${({ theme }) => (css`
        /* CUSTOM PROPERTIES */
        :root {
            /* Constants for Base font size (fluid) */
            --fs-base: ${theme.font.baseSize}px;
            --fs-factor-min: ${theme.font.lineHeight.min};
            --fs-factor-max: ${theme.font.lineHeight.max};
            --sp-factor: 1rem;
            --lh-min: 1.2;
            --lh-max: 1.5;
            /* Derived font sizes (min)*/
            --fs-400-min: var(--fs-base);
            --fs-500-min: calc(var(--fs-400-min) * var(--fs-factor-min));
            --fs-600-min: calc(var(--fs-500-min) * var(--fs-factor-min));
            --fs-700-min: calc(var(--fs-600-min) * var(--fs-factor-min));
            --fs-800-min: calc(var(--fs-700-min) * var(--fs-factor-min));
            --fs-900-min: calc(var(--fs-800-min) * var(--fs-factor-min));
            --fs-1000-min: calc(var(--fs-900-min) * var(--fs-factor-min));
            --fs-1100-min: calc(var(--fs-1000-min) * var(--fs-factor-min));
            --fs-1200-min: calc(var(--fs-1100-min) * var(--fs-factor-min));
            --fs-300-min: calc(var(--fs-400-min) / var(--fs-factor-min));
            --fs-200-min: calc(var(--fs-300-min) / var(--fs-factor-min));
            /* Derived font sizes (max)*/
            --fs-400-max: var(--fs-base);
            --fs-500-max: calc(var(--fs-400-max) * var(--fs-factor-max));
            --fs-600-max: calc(var(--fs-500-max) * var(--fs-factor-max));
            --fs-700-max: calc(var(--fs-600-max) * var(--fs-factor-max));
            --fs-800-max: calc(var(--fs-700-max) * var(--fs-factor-max));
            --fs-900-max: calc(var(--fs-800-max) * var(--fs-factor-max));
            --fs-1000-max: calc(var(--fs-900-max) * var(--fs-factor-max));
            --fs-1100-max: calc(var(--fs-1000-max) * var(--fs-factor-max));
            --fs-1200-max: calc(var(--fs-1100-max) * var(--fs-factor-max));
            --fs-300-max: calc(var(--fs-400-max) / var(--fs-factor-max));
            --fs-200-max: calc(var(--fs-300-max) / var(--fs-factor-max));
            /* Derived font sizes (fluid) */
            --fs-200: clamp(var(--fs-200-min), var(--fs-200-min) + 4vw, var(--fs-200-max));
            --fs-300: clamp(var(--fs-300-min), var(--fs-300-min) + 2vw, var(--fs-300-max));
            --fs-400: clamp(var(--fs-400-min), var(--fs-400-min) + 0vw, var(--fs-400-max));
            --fs-500: clamp(var(--fs-500-min), var(--fs-500-min) + 1vw, var(--fs-500-max));
            --fs-600: clamp(var(--fs-600-min), var(--fs-600-min) + 1.5vw, var(--fs-600-max));
            --fs-700: clamp(var(--fs-700-min), var(--fs-700-min) + 2vw, var(--fs-700-max));
            --fs-800: clamp(var(--fs-800-min), var(--fs-800-min) + 3vw, var(--fs-800-max));
            --fs-900: clamp(var(--fs-900-min), var(--fs-900-min) + 4vw, var(--fs-900-max));
            --fs-1000: clamp(var(--fs-1000-min), var(--fs-1000-min) + 5vw, var(--fs-1000-max));
            --fs-1100: clamp(var(--fs-1100-min), var(--fs-1100-min) + 6vw, var(--fs-1100-max));
            --fs-1200: clamp(var(--fs-1200-min), var(--fs-1200-min) + 7vw, var(--fs-1200-max));
            /* Derived spacings */
            --sp-200: calc(var(--sp-factor) * 0.5);
            --sp-300: calc(var(--sp-factor) * 0.75);
            --sp-400: calc(var(--sp-factor) * 1);
            --sp-500: calc(var(--sp-factor)* 2);
            --sp-600: calc(var(--sp-factor)* 3);
            --sp-700: calc(var(--sp-factor)* 4);
            --sp-800: calc(var(--sp-factor)* 5);
            --sp-900: calc(var(--sp-factor)* 6);
            --sp-1000: calc(var(--sp-factor)* 7);
            --sp-1100: calc(var(--sp-factor)* 8);
            --sp-1200: calc(var(--sp-factor)* 9);
            /* For Navbar */
            --navbar-height: 4rem;
            --navbar-z-index: 10;
        }
        /* RESET */
        /* Set rem */
        html, body {
            font-size: var(--fs-400);
            word-break: break-word;
            font-family: ${theme.font.family.primary};
            scroll-behavior: smooth;
        }
        /* Border box */
        *, *::before, *::after {
            box-sizing: border-box;
        }
        /* Remove margins, paddings and setting default font-weight */
        body, h1, h2, h3, h4, h5, p, button, textarea, caption, section, form, nav, aside, main, ul, ol, li, figure {
            margin: 0;
            padding: 0;
            font-weight: 400;
        }
        /* Form elements reset */
        input, button, textarea {
            font-family: ${theme.font.family.secondary};
            font-size: inherit;
            border: none;
            outline: none;
        }
        /* Anchor tags reset */
        a {
            text-decoration: none;
            color: ${theme.colors.primary.main};
            font-weight: 600;
        }

        /* COMPONENT STYLES */
        /* Scrollbar */
        body {
            scrollbar-width: auto;
            scrollbar-color: #2596be;
        }
        ::-webkit-scrollbar{
            width: 12px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background-color: #1e7898; 
        }
        ::-webkit-scrollbar-thumb {
            background-color: #F4f7f7;
            border-radius: 100rem;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: #dcdede;
        }

        /* Setting font sizes */
        p, form, nav, footer, header, aside, main {
            font-size: var(--fs-400);
            line-height: var(--lh-max);
        }
        h5 {
            font-size: var(--fs-500);
            line-height: var(--lh-max);
        }

        h4 {
            font-size: var(--fs-600);
            line-height: var(--lh-max);
        }

        h3 {
            font-size: var(--fs-700);
            line-height: var(--lh-min);
        }

        h2 {
            font-size: var(--fs-800);
            line-height: var(--lh-min);
        }

        h1 {
            font-size: var(--fs-900);
            line-height: var(--lh-min);
        }

        /* For tooltip */
        *[data-tooltip]::after {
            content: attr(data-tooltip);
            position: absolute;
            display: none;
            width: max-content;
            z-index: 10;
            font-size: var(--fs-300);
            color: white;
            background-color: black;
            padding: 4px 8px;
            border-radius: 4px;
            text-transform: capitalize;
        }

        *[data-tooltip]:hover::after {
            display: block;
        }

        *[data-tooltip-position='bottom-left']::after {
            top: 100%;
            left: -200%;
        }
        *[data-tooltip-position='bottom-right']::after {
            top: 100%;
            left: 200%;
        }
        *[data-tooltip-position='top-left']::after {
            top: 0%;
            left: -200%;
        }
        *[data-tooltip-position='top-right']::after {
            top: 0%;
            left: 200%;
        }
    `)}
`