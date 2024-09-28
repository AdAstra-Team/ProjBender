
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from 'react-router-dom';

export const SignOut = () => {    
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();


    if(keycloak != null && keycloak!==undefined && keycloak.authenticated)
        keycloak.logout();
    navigate('/');
}