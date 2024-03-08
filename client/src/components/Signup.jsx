import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.pathname || "/";


    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password).then((result) => {
            console.log(result.user);
            alert("Account created Successfully");
            navigate(from, { replace: true });
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
            <div className="modal-box action mt-0 flex flex-col justify-center">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-lg">สมัครสมาชิก</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">ชื่อ</span>
                        </label>
                        <input
                            type="ชื่อ"
                            placeholder="ชื่อ"
                            className="input input-bordered"
                            required
                            {...register("ชื่อ")}
                        />

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">นามสกุล</span>
                        </label>
                        <input
                            type="นามสกุล"
                            placeholder="นามสกุล"
                            className="input input-bordered"
                            required
                            {...register("นามสกุล")}
                        />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">อีเมลล์</span>
                        </label>
                        <input
                            type="อีเมลล์"
                            placeholder="อีเมลล์"
                            className="input input-bordered"
                            required
                            {...register("อีเมลล์")}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">รหัสผ่าน</span>
                        </label>
                        <input
                            type="รหัสผ่าน"
                            placeholder="รหัสผ่าน"
                            className="input input-bordered"
                            required
                            {...register("รหัสผ่าน")}
                        />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">ยืนยันรหัสผ่าน</span>
                        </label>
                        <input
                            type="ยืนยันรหัสผ่าน"
                            placeholder="ยืนยันรหัสผ่าน"
                            className="input input-bordered"
                            required
                            {...register("ยืนยันรหัสผ่าน")}
                        />
                    </div>


                    <div className="form-control mt-6">
                        <input
                            type="submit"
                            value="ลงทะเบียน"
                            className="btn bg-blue-700 text-white"
                        />
                    </div>


                    <p className="text-center my-2 ">
                        Have an account ?{" "}
                        <Link to="/signin" className="underline text--700 ml-1">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Signup;