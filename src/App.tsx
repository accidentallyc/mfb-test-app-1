import React from 'react';
import BagEditor from "./component/page/BagEditor/BagEditor";
import { UIRouter, UIView, pushStateLocationPlugin } from '@uirouter/react';
import {UIRouterReact} from "@uirouter/react/lib/core";
import BagView from "./component/page/BagView/BagView";
import {HTTPService} from "./service/HTTPService";
import FoodBagService from "./service/FoodBagService";

// define your states
const states = [
    {
        name: 'bag',
        url: '/foodbag',
        component: BagEditor,
    },
    {
        name: 'bagview',
        url: '/foodbag/:foodbagId',
        component: BagView,
        resolve: [
            {
                deps: ['$transition$'],
                token: 'foodbagId',
                resolveFn(trans:any) {
                    return trans.params().foodbagId;
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
