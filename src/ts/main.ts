import '../scss/style.scss'
import {applyRouting} from "./core/router.ts";
import DefaultLayout from "./layouts/DefaultLayout.ts";
import HomePage from "./pages/HomePage.ts";
import LoginPage from "./pages/LoginPage.ts";

applyRouting({
    '/login': {
        layout: DefaultLayout,
        page: LoginPage
    },
    '/': {
        layout: DefaultLayout,
        page: HomePage
    }
})


