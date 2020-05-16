# Hacker News Dark Mode

<a href="https://jgthms.com/hacker-news-dark-mode/"><img src="https://raw.githubusercontent.com/jgthms/hacker-news-dark-mode/master/screenshot.png" alt="Hacker News Dark Mode screenshot" style="max-width:100%;" width="1200"></a>

## Process

I took the [original CSS file](https://news.ycombinator.com/news.css) and applied as few as possible changes in order to set up a Dark Mode.
I took the original literal color values (like `#000000`) and used them to set up a list of initial [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties):

```css
:root {
  --black: #000000;
  --dark-grey: #222;
  --light-grey: #828282;
  --lightest-grey: #eee;
  --white: #ffffff;
  --orange: #ff6600;
  --beige: #f6f6ef;
}
```

I then set up semantic variables by referencing initial variables:

```css
:root {
  --page-background: var(--white);
  --accent: var(--orange);
  --text: var(--light-grey);
  --text-strong: var(--black);
  --border: var(--dark-grey);
  --background: var(--beige);
  --input-background: var(--white);
  --input-border: var(--lightest-grey);
}
```

At this point, the site should look exactly the same.

For Dark Mode, we could use the CSS media query [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).
However, the user might prefer Hacker News in light mode, whilst having his OS in Dark Mode.
Since there is no way to setup a color scheme preference per website, we'll be using a `data` attribute on the `<html>` element:

```html
<html lang="en" op="news" data-theme="dark">
```

This also makes it easier me to force the Dark Mode for demonstration purposes.

This theme attribute can be targeted with CSS:

```css
:root[data-theme="dark"] {
  --page-background: var(--darkest-blue);
  --accent: var(--blue);
  --text: var(--light-blue);
  --text-strong: var(--lightest-grey);
  --border: var(--light-blue);
  --background: var(--dark-blue);
  --input-border: var(--dark-blue);
  --input-background: var(--darkest-blue);
  --input-border: var(--accent);
}
```

There were also some additional changes I had to make for the Dark Mode to work.

## Dark Mode detection

For demonstration purposes, the Dark Mode is forced here by setting a `data` attribute on the `<html>` element.
Ideally, this preference would be a user one, and the server would return the appropriate HTML.
It is possible to detect the user's OS preference in JS:

```js
window.matchMedia("(prefers-color-scheme: dark)").matches; // True if useOS preference is dark
```

But swapping the theme client-side causes **flickering** on load, so it should be avoided.
It could however be used to detect a user's OS preference and set a default value server-side.
