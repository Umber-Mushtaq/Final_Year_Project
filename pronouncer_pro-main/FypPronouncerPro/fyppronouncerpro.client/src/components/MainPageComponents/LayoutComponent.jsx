import AppTopBar from "./AppTopBar";
import { Outlet } from 'react-router-dom';
function LayoutComponent() {
    return (
        <>
            <AppTopBar />
            <Outlet />
        </>
       
    )
}

export default LayoutComponent;