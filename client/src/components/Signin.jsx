import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";


const Signin = () => {
 
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    
    
      const from = location?.state?.pathname || "/";
    
      const onSubmit = (data) => {
        console.log(data);
        login(data.email, data.password)
          .then((result) => {
            const user = result.user;
            // console.log(user);

            navigate(from, { replace:true });
            alert("Login Successful");
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const googleSignUp = () => {
        signUpWithGoogle()
        .then((result) => {
            const user = result.user;
            console.log(user);
            alert("Login Google Successful");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
    };

  return (
    <div>
      <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
        <div className="modal-box action mt-0 flex flex-col justify-center">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Please Login!</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register("password")}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-red-700 text-white"
              />
            </div>
            <p className="text-center my-2 ">
              Don't have an account ?{" "}
              <Link to="/signup" className="underline text-red-700 ml-1">
                Sign Up Now
              </Link>
            </p>
            <button
              htmlfor={name}
              className="btn btn-sm btn-cicle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById(name).close()}
            ></button>
          </form>
          <div className="text-center space-x-3 mb-5 ">
            <button
              className="btn btn-ghost btn-circle hover:bg-red-700 hover:text-white "
              onClick={googleSignUp}
            >
              <SiGmail />
            </button>
            <button className="btn btn-ghost btn-circle hover:bg-red-700 hover:text-white ">
              <FaFacebookF />
            </button>
            <button className="btn btn-ghost btn-circle hover:bg-red-700 hover:text-white ">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
