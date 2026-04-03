# Filterun JS

A lightweight, dependency-free JavaScript library for professional image filtering. Inspired by Canva and Instagram, it provides over 25 ready-to-use presets and manual control over CSS filters and vignette effects.

## Features
* **25+ Presets:** Carefully tuned presets like Clarity, Haze, Nordic, and more.
* **Vignette Layer:** Adjustable inner shadow overlay for artistic depth.
* **Smart UI:** Toggleable manual range controls and real-time CSS code output.
* **Flexible Initialization:** Choose which presets to show and whether to allow customization.
* **Copy to Clipboard:** Instantly copy generated CSS styles.

---

## Installation

### 1. Via CDN (Quick Start)
Add these lines to your `<head>`:
```html
<link rel="stylesheet" href="[https://cdn.jsdelivr.net/gh/hornax/filterun/dist/filterun.min.css](https://cdn.jsdelivr.net/gh/hornax/filterun/dist/filterun.min.css)">
<script src="[https://cdn.jsdelivr.net/gh/hornax/filterun/dist/filterun.min.js](https://cdn.jsdelivr.net/gh/hornax/filterun/dist/filterun.min.js)"></script>
````

### 2\. Manual Setup

Download the `dist` folder and include it in your project:

```html
<link rel="stylesheet" href="path/to/filterun.min.css">
<script src="path/to/filterun.min.js"></script>
```

-----

## Usage

### HTML Structure

The library target should be a wrapper containing an image inside a preview container:

```html
<div class="js-filterun fltrn-wrapper">
    <div class="fltrn-preview-container">
        <img src="your-photo.jpg" alt="Preview">
    </div>
</div>
```

### Initialization

Initialize the class in your JavaScript file:

```javascript
const editor = new Filterun('.js-filterun', {
    show_css: true,           // Display generated CSS code block
    customize_filters: true,  // Show manual range sliders
    presets: 'all'            // Use 'all' or array of IDs: ['normal', 'drama', 'ink']
});
```

-----

## Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `show_css` | Boolean | `true` | Enables/disables the CSS output panel with copy button. |
| `customize_filters` | Boolean | `true` | Enables/disables manual sliders (Brightness, Contrast, etc.). |
| `presets` | Array/String | `'all'` | Filters the list of displayed presets by their IDs. |

-----

## Available Preset IDs

If you want to limit the list, use these IDs in the `presets` array:
`normal`, `clarity`, `haze`, `airy`, `focus`, `matte`, `clean`, `melancholy`, `cinema`, `sunkissed`, `fresh`, `faded`, `rosie`, `nordic`, `drama`, `softgrey`, `bluemist`, `ashbury`, `lumen`, `vivid`, `bold`, `urban`, `autumn`, `ink`, `yummy`, `dusty`.

-----

## License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).
