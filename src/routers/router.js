import React from "react";

import MiniDrawer from "../component/homeComponent/drawer/drawer";
import Finished_Page from "../pages/finished_page/finished";
import Home_page from "../pages/home_page/home_page";

export const routes = [

    {
        path: "/abcd",
        element: <MiniDrawer />,
        exact: true,
        children: [
            {
                path: "/finished-page", element: <Finished_Page />
            }

        ],
    },
    {
        path: "/",
        element: <Home_page />,
        exact: true,
    }

];

