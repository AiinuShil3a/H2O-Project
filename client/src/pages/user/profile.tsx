import { useContext } from "react";
import { AuthContext } from "../../AuthContext/auth.provider";
import { FaEdit } from "react-icons/fa";

const Profile: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { userInfo } = authContext;

  if (userInfo && userInfo.role === "user") {
    return (
      <div className="flex flex-col justify-center mx-auto max-w-screen-xl px-6 py-12 w-[80vw] ml-[4rem]">
        <h1 className="text-2xl mb-6">ข้อมูลผู้ใช้</h1>

        <div className="mb-6">
          <div className="flex items-center justify-between bg-white shadow-2xl rounded-lg px-6 py-4 mb-4 h-[12vh]">
            <h1 className="text-lg">
              ชื่อผู้ใช้ : {userInfo.name} {userInfo.lastName}
            </h1>
            <button className="text-blue-500 hover:text-blue-700">
              <FaEdit size={24} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between bg-smoke shadow-2xl rounded-lg px-6 py-4 mb-4 h-[12vh]">
            <h1 className="text-lg">
              ที่อยู่ :{" "}
              {userInfo.address !== "" ? userInfo.address : "ยังไม่มีข้อมูล"}
            </h1>
            <button className="text-blue-500 hover:text-blue-700">
              <FaEdit size={24} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between bg-white shadow-2xl rounded-lg px-6 py-4 mb-4 h-[12vh]">
            <h1 className="text-lg">
              วันเกิด :{" "}
              {userInfo.birthday !== null
                ? userInfo.birthday.toString()
                : "ยังไม่มีข้อมูล"}
            </h1>
            <button className="text-blue-500 hover:text-blue-700">
              <FaEdit size={24} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between bg-smoke shadow-2xl rounded-lg px-6 py-4 mb-4 h-[12vh]">
            <h1 className="text-lg">
              เบอร์โทรศัพท์ :{" "}
              {userInfo.phone !== "" ? userInfo.phone : "ยังไม่มีข้อมูล"}
            </h1>
            <button className="text-blue-500 hover:text-blue-700">
              <FaEdit size={24} />
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
