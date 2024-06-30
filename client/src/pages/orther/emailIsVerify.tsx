import { useEffect , useState , useContext } from 'react';
import { AuthContext } from "../../AuthContext/auth.provider"
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Home from "../home/homepage";
import Animetionload from "../../assets/loadingAPI/loaddingTravel";


const EmailIsVerify = () => {

    const authContext = useContext(AuthContext);

    if (!authContext) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }
  
    const { userInfo } = authContext;

    const[navigateOpen , setNavigateOpen] = useState<boolean>(false)

    useEffect(() => {
        Swal.fire({
        title:'Email is Verify',
        text: 'Your Account is Ready for Use Now',
        icon: 'success',
        confirmButtonText: 'OK',
        }).then((result) => {
        if (result.isConfirmed) {
            setNavigateOpen(true);
            {userInfo 
                ? null
                :(document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
            }
        }
        });
    }, []);

    if (!navigateOpen) {
        if(!userInfo){
            return <Home />
        }else{
            return <Animetionload />
        }
    } else {
        return <Navigate to="/" />;
    }
};

export default EmailIsVerify;
