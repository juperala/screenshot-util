# screenshot-util
Small test utility to take screenshot from website with multiple browsers and page widths. Allows comparison of page layout and responsiviness with different browsers.

## configure
Edit [screenshot-config.js](screenshot-config.js):
- url: URL from where the screenshot is to be taken.
- browsers: Array of browser names that are used to take screenshot.
- breakpoints: Browser widths used to take screenshot.

**NOTE:** For each used browser a corresponding WebDriver instance needs to be available in the path.

## execution
Run `npm run-scripts screenshot-util` to perform taking screenshots. Screenshots are stored in `/screenshots` folder. 
