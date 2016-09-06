# [`sharingbuttons.io`](http://sharingbuttons.io) <a href="http://thinkmill.com.au"><img alt="Supported by Thinkmill" src="https://thinkmill.github.io/badge/heart.svg" /></a>

A web app to quickly generate social sharing buttons that do not track the user.

![Screenshot of sharingbuttons.io](https://i.imgur.com/MszRa5f.jpg)

Built using `React.js` and utilising the `Flux` application architecture.

## Getting up and running

After cloning this repository, run `npm install` in the root directory to install the dependencies. As soon as all of them are installed, you can `npm start` in the root directory and open `0.0.0.0:3000` in your browser to see your local copy of the app.

## Structure

The main part of the application is rendered in the `App` component found at `js/components/App.react.js`. All of the components can dispatch actions to change things.

### Actions

The following actions are available:

* `AppActions.toggleNetwork(network)` - Toggles a social network on/off

* `AppActions.setURL(url)` - Sets the shared URL

* `AppActions.setText(text)` - Sets the shared text

* `AppActions.changeSize(size)` - Changes the size of the buttons

* `AppActions.changeIcon(type)` - Changes the icon type

For a more in-depth documentation of the available actions, have a look at the AppActions found at `js/actions/AppActions.js`. All of these actions get picked up by the `AppStore`, found at `js/stores/AppStore.js`. The AppStore then changes the data and emits that it changed, which prompts the app to rerender with the new data.

To define a new action, first add the action type to the `AppConstants` (`js/constants/AppConstants.js`), then pick up the dispatched action in the `AppStore.AppDispatcher.register()` function and change something according to the action.

### Components

The app is split up across 6 components, all found in `js/components`. The following components are rendered:

* `App.react.js` - The root component that renders the rest of the application. Contains most of the static text found on the page.

* `Generator.react.js` - Renders the Generator.

* `SelectionButton.react.js` - Renders the options of the Generator.

* `GeneratorCode.react.js` - Renders the code to be copied.

* `GeneratorPreview.react.js` - Renders the preview page.

* `Header.react.js` - Renders the header.

* `PreviewButton.react.js` - Renders a preview button.

* `Footer.react.js` - Renders the footer.

## Contributing

sharingbuttons.io loves community involvement! Take a look at the [unassigned open issues](https://github.com/mxstbr/sharingbuttons.io/issues?q=is%3Aopen+is%3Aissue+no%3Aassignee), especially the [unassigned open requests for help](https://github.com/mxstbr/sharingbuttons.io/issues?q=is%3Aopen+is%3Aissue+no%3Aassignee+label%3A%22help+wanted%22), or open a new issue/make a PR!

<!-- PRs are welcome. Check [the wiki's notes on contributing](https://github.com/mxstbr/sharingbuttons.io/wiki) for details -->

## Help

If you need help with anything regarding this app, contact me on [twitter](https://twitter.com/mxstbr) and I will try to help you as quickly as possible.

## License

This project is licensed under the MIT license:

The MIT License (MIT)

Copyright (c) 2015 Maximilian Stoiber

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
