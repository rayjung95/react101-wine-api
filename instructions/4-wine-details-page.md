# Wine details page

Creating the `WinePage` component is quite simple too. What we have to do is:
* fetch data from the API to get the selected wine details,
* backport the management of the comments modal.

Remember, `WinePage` is a *Smart Component* (it uses its `state`) and `Wine` must not be modified (it is a *Dumb Component* that only uses its props).

The component tree should look like:

<img src='https://github.com/react-bootcamp/react-102/raw/master/instructions/img/wireframe-wine-details.png' alt='Wine details page'>

No more help here because it is quite easy to create the `WinePage` component :wink:

## What's next

When it works, go to the [next step](./5-back-and-home-buttons.md) to add a **Back** button and a **Home** button.
