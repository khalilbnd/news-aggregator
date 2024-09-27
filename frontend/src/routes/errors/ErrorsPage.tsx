/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError } from "react-router-dom";
import './style.css'
export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1 className="text-color-black">Oops!</h1>
            <p className="text-color-black">Sorry, an unexpected error has occurred.</p>
            <p className="text-color-black">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}