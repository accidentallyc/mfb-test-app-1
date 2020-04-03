import React from 'react';
import {pushStateLocationPlugin, UIRouter, UIView} from '@uirouter/react';
import {UIRouterReact} from "@uirouter/react/lib/core";
import BagView from "./component/page/BagView/BagView";
import MFBStore from "./service/MFBStore";
import {FOODBAG_FETCH, FOODBAG_NEW} from "./service/action/FoodbagActions";
import BagList from "./component/page/BagList/BagList";
import FoodBagService from "./service/FoodBagService";

// define your states
const states = [
    {
      name: 'not-found',
      url: '/404',
      component: () => <h1>Resource not found</h1>
    },
    {
        name: 'baglist',
        url: '/foodbag',
        component: BagList
    },
    {
        name: 'bagview',
        url: '/foodbag/:foodBagId?edit&new',
        component: BagView,
        resolve: [
            {
                deps: ['$transition$'],
                token:"foodBagId",
                resolveFn(trans:any) {
                    const foodBagId = trans.params().foodBagId;
                    const isNew =  trans.params().new === "true";

                    return FoodBagService
                        .GetBagById(foodBagId,["creator"])
                        .then(() => {
                            MFBStore.dispatch(FOODBAG_FETCH(foodBagId,["creator","ingredientStacks","recipeStacks","description"]))
                            return foodBagId
                        })
                        .catch(() => {
                            if(isNew) {
                                MFBStore.dispatch(FOODBAG_NEW(foodBagId))
                                return foodBagId
                            } else {
                                window.location.href = "/404"
                            }
                        })

                }
            },
            {
                deps: ['$transition$'],
                token:"mode",
                resolveFn(trans:any) {
                    return trans.params().edit === "true" ? "edit" : "readonly";
                }
            },
            {
                deps: ['$transition$'],
                token:"isNew",
                resolveFn(trans:any) {
                    return trans.params().new === "true";
                }
            }
        ]
    }
];

const configRouter = (router:UIRouterReact) => {
    router.urlRouter.otherwise('/foodbag')
}

// select your plugins
const plugins = [pushStateLocationPlugin];

function App() {
  return <UIRouter plugins={plugins} states={states} config={configRouter}>
      <UIView />
  </UIRouter>;
}

export default App;
