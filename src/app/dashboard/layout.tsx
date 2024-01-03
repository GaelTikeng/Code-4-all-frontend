import Image from "next/image";
import Link from "next/link";

// React icons import
import { MdDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    name: "Upload Code",
    path: "/dashboard/upload",
    icon: <MdDashboard />,
  },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-sccreen flex">
      <div className="sideNav bg-[#f1f1f1] h-screen w-[20vw] flex flex-col justify-between">
        <div className="flex w-full justify-center items-center p-2">
          <Image
            src={"/code4all.png"}
            alt={"code4all logo"}
            width={200}
            height={100}
          />
        </div>

        <div className="flex flex-col justify-between py-2 h-[80vh]">
          <div className="flex flex-col gap-2">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className="px-9 py-2 flex items-center gap-2 hover:bg-white hover:border-l-2 duration-5 border-[#F94D1D]"
              >
                {" "}
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          <button className="flex items-center justify-center hover:bg-white text-[#F94D1D]  gap-2 px-6">
            <CiLogout /> Logout
          </button>
        </div>
      </div>
      <div className="Main w-[80vw] h-screen  p-5">
        <div className="topNav flex items-center justify-between">
          <div className="input flex bg-[#f1f1f1] w-[80%] items-center py-1 px-2 gap-2 rounded-full">
            <CiSearch size={20} />
            <input
              type="text"
              placeholder="search..."
              className="w-full  outline-none bg-transparent"
            />
          </div>
          <div>avatar</div>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

export default layout;
