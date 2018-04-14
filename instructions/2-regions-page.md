# Regions page

Let's start from the simple code of the `RegionsPage` component created previously:

```javascript
export class RegionsPage  extends Component {
  render() {
    return (
      <div>Regions</div>
    );
  }
}
```

What we have to do is to enhance this code to:
* fetch data from the API,
* manage clics on the regions to navigate to the wine list page.

`RegionsPage` is a *Smart Component*, it will use its state to store data and will render the `Regions` component with theses data. You do not have to modify the `Regions` component, it must always be a *Dumb Component*.

The component tree looks like:

<img src='https://github.com/react-bootcamp/react-102/raw/master/instructions/img/wireframe-regions.png' alt='Regions page'>


## Fetch the data

The state of the `Regions` components has two attributes:
* the list of the wine regions,
* a flag that indicates if the regions are loaded or not.

First create the initial state of the component:

```javascript
export class RegionsPage  extends Component {
  // ...
  state = {
    loading: false,
    regions: [],
  };
  // ...
}
```

Then fetch the wine regions by using the API in the `componentDidMount()` lifecycle method:

```javascript
export class RegionsPage  extends Component {
  // ...
  componentDidMount() {
    this.setState({ loading: true }, () => {
      WinesService.fetchRegions().then(regions => {
        this.setState({
          loading: false,
          regions,
        });
      });
    });
  }
  // ...
}
```

And finally render the `Regions` component using the state:

```javascript
export class RegionsPage  extends Component {
  // ...
  render() {
    if (this.state.loading) {
      return <div className="center-align"><Loader /></div>
    }
    return (
      <Regions
        regions={this.state.regions}
        region={{}} />
    );
  }
}
```

## Manage navigation

Now the last thing to do is to manage the clic event on a wine region.

Define the `onSelectRegion()` callback and use it in the `Regions` component. The callback uses the [`push()`](https://github.com/ReactTraining/react-router/blob/master/docs/API.md#pushpathorloc) method of the router to navigate to the wine list page.

```javascript
export class RegionsPage  extends Component {
  // ...
  onSelectRegion = (region) => {
    this.props.router.push({
      pathname: `/regions/${region}`
    });
  };

  render() {
    if (this.state.loading) {
      return <div className="center-align"><Loader /></div>
    }
    return (
      <Regions
        onSelectRegion={this.onSelectRegion}
        regions={this.state.regions}
        region={{}} />
    );
  }
}
```

## What's next

Now you're ready to create the other pages of the SPA.
Go to the [next step](./3-wine-list-page.md) to create the `WineListPage` component.
