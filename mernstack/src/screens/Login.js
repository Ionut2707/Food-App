import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'

const Login = () => {

   const [credentials, setCredentials] = useState({
     email: "",
     password: "",
   });
  
  const navigate = useNavigate()

   const handleSubmit = async (e) => {
     e.preventDefault();
     console.log(
       JSON.stringify({
         email: credentials.email,
         password: credentials.password,
       })
     );
     const response = await fetch("http://localhost:5001/api/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         email: credentials.email,
         password: credentials.password,
       }),
     });
     const json = await response.json();
     console.log(json);
     

     if (!json.success) {
       alert("Enter Valid Credentials");
      setCredentials({email:"",password:""})
     } else {
       localStorage.setItem("userEmail",credentials.email)
       localStorage.setItem("authToken", json.authToken);
       console.log(localStorage.getItem("authToken"));
       navigate("/")
     }
   };

   const onChange = (e) => {
     setCredentials((prevCredentials) => ({
       ...prevCredentials,
       [e.target.name]: e.target.value,
     }));
   };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
         
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              id="exampleInputEmail1"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            You don't have an account? Register Now!
          </Link>
        </form>
      </div>
    </>
  );
}
export default Login