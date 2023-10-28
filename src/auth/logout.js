import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientID = "329607877296-pe2k6qp6ncs83ptv0k918709vq6qc13b.apps.googleusercontent.com";

function Logout() {
  const navigate = useNavigate()

  const onSuccess = (_res) => {
    console.log("LOGOUT SUCCESS!");
    navigate('/Login');

  }
  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientID}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
        className="w-36 h-10"
      />
    </div>
  )
}

export default Logout;