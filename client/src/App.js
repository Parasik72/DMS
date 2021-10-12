import { Registration } from "./components/Authorization/Registration";
import {Switch, Route, Redirect} from 'react-router-dom';
import { Login } from "./components/Authorization/Login";
import styles from './app.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Main } from "./components/Main/Main";
import { GetDocs } from "./components/Main/GetDocs/GetDocs";
import { UploadDocs } from "./components/Main/UploadDocs/UploadDocs";
import { EditDocs } from "./components/Main/EditDocs/EditDocs";
import { Navbar } from "./components/Navbar/Navbar";
import { useUser } from "./actions/user";

function App() {
    const isAuth = useSelector(state => state.userReducer.isAuth);
    const user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    const {auth, ready} = useUser();
    const checkRole = () => {
        let bflag = false;
        user.roles.forEach(element => {
            if(element === 'ADMIN')
                bflag = true;
        });
        return bflag;
    }
    useEffect(() => {
        dispatch(auth());
    }, [dispatch, auth]);
    return (
        <div className={styles.app}>
            <Navbar ready={ready}/>
            {isAuth && ready
            ?
            <Switch>
                <Route path="/" exact>
                    <Main />
                </Route>
                <Route path="/getDocs" exact>
                    <GetDocs />
                </Route>
                <Route path="/uploadDocs" exact>
                    {checkRole() ? <UploadDocs /> : <Redirect to="/"/>}
                </Route>
                <Route path="/editDocs" exact>
                   {checkRole () ? <EditDocs /> : <Redirect to="/"/>}
                </Route>
                <Redirect to="/"/>
            </Switch>
            : ready ?
            <Switch>
                <Route path="/registration" exact>
                    <Registration />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Redirect to="/login"/>
            </Switch>
            :
            <>
            </>
        }
        </div>
    );
}

export default App;
