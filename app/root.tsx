import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { TodoProvider } from "~/todo/provider";


export function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        {children}
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

/**
 * cái outlet này là nơi điều hướng trang web nên mọi provider của store
 * cần được implement vào đây để làm global store
 * fact:khi khai báo store bằng reducer hoặc redux các kiểu thì phạm vi của biến
 * lúc này nó nằm ở cấp ngoài cùng của cây dom, (nếu là file index.html thì nó nằm ở thẻ root)
 *
 * Todo: cần làm thêm vể route
 */
export default function App() {
    return <TodoProvider>
        <Outlet/>
    </TodoProvider>;
}
