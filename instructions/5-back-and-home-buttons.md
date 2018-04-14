# Back and Home buttons

We can add buttons to go Back (previous page) and to go Home. This is quite simple:
* use the [`goBack()`](https://github.com/ReactTraining/react-router/blob/master/docs/API.md#goback) method of the router to go back to the previous page,
* use the [`push()`](https://github.com/ReactTraining/react-router/blob/master/docs/API.md#pushpathorloc) method of the router to go home.

Add the buttons and the corresponding callbacks in the `WineApp` container:

```javascript
export class WineApp  extends Component {

  goBack = (e) => {
    e.preventDefault();
    this.props.router.goBack();
  };

  goHome = (e) => {
    e.preventDefault();
    this.props.router.push({
      pathname: "/"
    });
  };

  render() {
    // Create a flag to hide buttons on the home page.
    const displayButton = window.location.pathname !== '/';

    return (
      <div className="container">
        <h1 className="center-align">Open Wine Database</h1>
        <div className="center-align">
          You can read the Wines API documentation at <a href="https://bit.ly/rbw-api" target="_blank">https://wines-api.herokuapp.com</a> and try it <a href="https://bit.ly/rbw-api-swag" target="_blank">here</a>
        </div>
        {displayButton && (<div className="center-align" style={{ marginTop: 20 }}>
          <button className="btn waves-effect waves-light" onClick={this.goBack} type="button">
            <i className="material-icons left">fast_rewind</i>
            Back
          </button>
          <button className="btn waves-effect waves-light" style={{ marginLeft: 10 }} onClick={this.goHome} type="button">
            <i className="material-icons left">home</i>
            Home
          </button>
        </div>)}
        <div className="row">
          {this.props.children}
        </div>
      </div>
    );
  }
}
```
