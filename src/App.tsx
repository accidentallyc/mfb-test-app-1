import React from 'react';
import BagEditor from "./component/page/BagEditor/BagEditor";
import {pushStateLocationPlugin, UIRouter, UIView} from '@uirouter/react';
import {UIRouterReact} from "@uirouter/react/lib/core";
import BagView from "./component/page/BagView/BagView";
import MFBStore from "./service/MFBStore";
import {FOODBAG_FETCH} from "./service/action/FoodbagActions";

// define your states
const states = [
    {
        name: 'bag',
        url: '/old',
        component: BagEditor,
    },
    {
        name: 'bagview',
        url: '/foodbag/:foodBagId?edit',
        component: BagView,
        resolve: [
            {
                deps: ['$transition$'],
                token:"foodBagId",
                resolveFn(trans:any) {
                    const foodBagId = trans.params().foodBagId;
                    MFBStore.dispatch(FOODBAG_FETCH(foodBagId,["creator","ingredientStacks","recipeStacks","description"]));
                    return foodBagId;
                }
            },
            {
                deps: ['$transition$'],
                token:"mode",
                resolveFn(trans:any) {
                    return trans.params().edit === "true" ? "edit" : "readonly";
                }
            }
        ]
    }
];

const configRouter = (router:UIRouterReact) => {
    router.urlRouter.otherwise('/foodbag/1d8dec3a-c47d-4c7d-9ff9-ede49e047e96?edit=true')
}

// select your plugins
const plugins = [pushStateLocationPlugin];

function App() {
  return <UIRouter plugins={plugins} states={states} config={configRouter}>
      <UIView />
  </UIRouter>;
}

export default App;
