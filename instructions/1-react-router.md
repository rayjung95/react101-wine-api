# React Router

## Install the router

This step is already done for you, but here is how to install the `react-router` dependency from scratch if you need to.

Two ways to install it:

* Add the dependency directly into the `package.json` file:
```json
"dependencies": {
    "react-router": "3.0.5",
}
```

* Add the dependency using the command line:
```
yarn add react-router -E
```

## Key concepts

[React Router](https://github.com/ReactTraining/react-router/) is very well documented, so the best thing to do is to read the [introduction](https://github.com/ReactTraining/react-router/blob/master/docs/Introduction.md) to become familiar with the key concepts of the library.

## Configure the router

The router configuration is done in the `index.js` file.

First, import several things from the `react-router` package:

```javascript
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
```

Then create the router:

```javascript
class RoutedApp extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={WineApp}>
          <IndexRoute component={RegionsPage} />
          <Route path="regions/:regionId" component={WineListPage} />
          <Route path="regions/:regionId/wines/:wineId" component={WinePage} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }
}
```

And render it into the DOM:

```javascript
ReactDOM.render(<RoutedApp />, document.getElementById('root'));
```


The `Router` is the top-level element of the router configuration hierarchy. It uses the [`browserHistory`](https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#browserhistory) strategy - based on HTML5 history API - to manipulate the browser URL.

The first `Route` element is mapped on the `/` path and references a container component (`WineApp`) that will render the router's current page.
This is the entry point of our app and it must look like this:

```javascript
export class WineApp extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="center-align">Open Wine Database</h1>
        <div className="row">
          {this.props.children}
        </div>
      </div>
    );
  }
}
```

The concrete routes of our SPA are defined as children of this top-level route. The `IndexRoute` is the default route for the `/` path and will render the `RegionsPage` component. The `WineListPage` component will render when the path is `regions/:regionId` and the `WinePage` component will render when the path is `regions/:regionId/wines/:wineId`.

So :
* when the URL is `/`, the router will render `<WineApp><RegionsPage /></WineApp>`
* when the URL matches `/regions/:regionId`, the router will render `<WineApp><WineListPage /></WineApp>`
* when the URL matches `/regions/:regionId/wines/:wineId`, the router will render `<WineApp><WinePage /></WineApp>`

The `RegionsPage`, `WineListPage` and `WinePage` components do not exists yet. You can create basic versions of these components just to quickly test the router.

The right place to create the `RegionsPage` is into the `Region.js` file, next to the `Region` component. This is the same rule for `WineListPage` (into `WineList.js`) and `WinePage` (into `Wine.js`).

A simple version of the `RegionsPage` component is:

```javascript
export class RegionsPage extends Component {
  render() {
    return (
      <div>Regions</div>
    );
  }
}
```

For the two other components, the path parameter values are available via the component props. So a simple version of the `WineListPage` component is:

```javascript
export class WineListPage extends Component {
  render() {
    return [
      <div>Wines</div>,
      <p>Region identifier is {this.props.params.regionId}</p>
    ];
  }
}
```

Do the same for the `WinePage` component:
```javascript
export class WinePage extends Component {
  render() {
    return [
      <div>Wine details</div>,
      <p>Region identifier is {this.props.params.regionId}</p>,
      <p>Wine identifier is {this.props.params.wineId}</p>
    ];
  }
}
```

Finally we define a generic route for all the unmapped paths and render a `NotFound` component in that case:

```javascript
<Route path="*" component={NotFound} />
```

The `NotFound` component is a very very complicated one :wink:

```javascript
export class NotFound extends Component {
  render() {
    return (
      <h1>Not Found !!!!</h1>
    );
  }
}
```

*Tip: do not forget to import all these new components:*
```javascript
import { WineApp, RegionsPage, WineListPage, WinePage, NotFound } from './components';
```

## What's next

Now you're ready to create the real pages of the SPA.
Go to the [next step](./2-regions-page.md) to start writing the `RegionsPage` component.
