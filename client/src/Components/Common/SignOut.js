
// import { useKeycloak } from "@react-keycloak/web";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../../Features/Auth/authSlice';

export const SignOut = () => {    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { keycloak } = useKeycloak();


    // if(keycloak != null && keycloak!==undefined && keycloak.authenticated)
    //     keycloak.logout();
    dispatch(clearAuth());
    navigate('/');
}