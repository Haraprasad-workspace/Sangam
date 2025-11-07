import React, { useState } from "react";
import delete_icon from "../assets/delete_icon.svg";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const DeletePost = ({ postid }) => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_BASE;
  const [deleting, setdeleting] = useState(false);

  const deletepost = async () => {
    setdeleting(true);
    const result = await Swal.fire({
      title: "are you sure!",
      text: "you wont be able to recover this post",
      icon: "warning",
      showCancelButton: true,
    });
    if (!result.isConfirmed) {
      return setdeleting(false);
    }
    try {
      let res = await fetch(`${base_url}/deletepost/${postid}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("some error caught while deleting the post");
      }

      await Swal.fire({
        title: "Deleted!",
        icon: "success",
        text: "Your Post has been successfully deleted",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      navigate("/home");
    } catch (err) {
      console.log(err);
    } finally {
      setdeleting(false);
    }
  };

  return (
    <div className="cursor-pointer rounded-full flex-col flex items-center justify-center mt-2">
      <div
        onClick={deletepost}
        className={`w-fit p-1 rounded-full border-2 border-red-300  ${
          deleting ? "opacity-50 cursor-not-allowed" : ""
        } `}
      >
        <img className="w-4 md:w-6 " src={delete_icon} />
      </div>
    </div>
  );
};

export default DeletePost;
