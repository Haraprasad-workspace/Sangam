import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SangamHero from "./SangamHero";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const EditProfile = () => {
  const navigate = useNavigate();


  const base_url = import.meta.env.VITE_API_BASE;
 
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [profile, setprofile] = useState([]);
  const [loading, setloading] = useState(true);
  const [profileupdated, setprofileupdated] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatarurl||"");
  
  
  const avatars = [
  "https://www.svgrepo.com/show/29799/avatar.svg",
  "https://www.svgrepo.com/show/29870/avatar.svg",
  "https://www.svgrepo.com/show/17344/avatar.svg",
  "https://www.svgrepo.com/show/30132/avatar.svg",
  "https://www.svgrepo.com/show/153727/profile-avatar.svg"
];


  const getProfile = async () => {
    try {
      //fetch api to call the route getprofile in the backend

      const res = await fetch(`${base_url}/getProfile`, {
        method: "GET",
        credentials: "include",
      });

      //if res is ok then its ok or else raise a error

      if (!res.ok) {
        throw new Error("profile could not be fetched ");
      }

      //save the json response in the varibale data

      const data = await res.json();
      setprofile(data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  const onsubmit = async (data) => {
    try {
      const payload = { ...data, avatar: selectedAvatar };
      let res = await fetch(`${base_url}/updateprofile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      setprofileupdated(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
  if (profile.avatarurl) 
    {
      setSelectedAvatar(profile.avatarurl);
    }
}, [profile]);

  useEffect(() => {
    if (profileupdated) {
      Swal.fire({
        title:"Profile Updated !!",
        text:"Your profile has been successfully updated",
        icon:"success",
        showConfirmButton:false,
        timer:1200
      })
      navigate("/profile");
    }
  }, [profileupdated, navigate]);

  if (loading) {
    return <SangamHero />;
  } else {
    return (
      <div className="bg-cover bg-center font-oswald bg-[url(/assets/sangam_background.jpg)] w-full h-screen flex flex-col">
        <Navbar />
        <div className="login-box flex flex-col w-fit h-auto m-auto p-7 rounded-md border-2">
          <p className="md:text-2xl text-xl font-bold m-auto">
            Update your Profile
          </p>
          <div className="login-form flex text-xs  md:text-xl flex-col p-5 mt-5">
            <form onSubmit={handleSubmit(onsubmit)}>
              <label className="font-bold mb-2">Select Profile Avatar:</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-5">
                {avatars.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="avatar"
                    className={`w-14 h-14 md:w-24 md:h-24 rounded-full cursor-pointer border-4 ${
                      selectedAvatar === url
                        ? "border-orange-400"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedAvatar(url)}
                  />
                ))}
              </div>

              <label className="font-bold">Username:-</label>
              <input
                type="text"
                className="w-full bg-transparent px-2 py-3 mb-3 rounded-md border-2 border-black font-semibold"
                defaultValue={profile.username}
                {...register("username", {
                  required: "name is required",
                  minLength: {
                    value: 2,
                    message: "minimum length of name must be 2 ",
                  },
                })}
              />

              {errors.username && (
                <p className="text-red-500 text-xs">{errors.username.message}</p>
              )}

              <label className="font-bold">Name:-</label>
              <input
                type="text"
                className="w-full bg-transparent text-zinc-500 px-2 py-3 mb-3 rounded-md border-2 border-black font-semibold"
                disabled
                value={profile.name}
              ></input>
              <label className="font-bold">Email:-</label>
              <input
                type="text"
                className="w-full bg-transparent text-zinc-500 px-2 py-3 mb-3 rounded-md border-2 border-black font-semibold"
                disabled
                value={profile.email}
              ></input>

              {/* Submit button */}
              <div className="submit-bttn flex flex-col">
                <input
                  type="submit"
                  value="Update Profile"
                  className="bg-orange-400 mt-3 font-bold px-3 py-2 w-fit m-auto rounded-md cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default EditProfile;
