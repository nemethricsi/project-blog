'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { Moon, Rss, Sun } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import {
  COLOR_THEME_COOKIE,
  DARK_TOKENS,
  LIGHT_TOKENS,
} from '@/constants';
import Cookie from 'js-cookie';
import styles from './Header.module.css';

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = useState(initialTheme);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    Cookie.set(COLOR_THEME_COOKIE, newTheme, { expires: 1000 });

    const newTokens = newTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;

    root.setAttribute('data-color-theme', newTheme);
    Object.entries(newTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={handleToggleTheme}>
          {theme === 'light' ? (
            <Sun size="1.5rem" />
          ) : (
            <Moon size="1.5rem" />
          )}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
