import React, { useEffect , useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"


const ThoughtForm = ({suggestion}) => {
  const base_url = import.meta.env.VITE_API_BASE;
  const Navigate = useNavigate();
  const [submitting, setsubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } , setValue } = useForm();

  const onsubmit = async (data) => {
    setsubmitting(true);
    try {
      const res = await fetch(`${base_url}/writeThought`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(data)
      });


      if (!res.ok) {
        throw new Error("could not write your post ");
      }else {
        await Swal.fire({
          title:"Posted!!",
          text:"Your thought has been posted successfully",
          icon:'success',
          timer:1200,
          showCloseButton:false
        })

        Navigate('/home');

      }
    } catch (err) {


      console.log(err);

      Swal.fire({
        title:"error",
        text:`${err}`,
        icon:"error",
        showCloseButton:true
      })

    }finally{
      setsubmitting(false);
    }
  };

  useEffect(() => {
    if(suggestion){
      setValue("thought",suggestion);
    }
  }, [suggestion , setValue])
  
  if(submitting){
    return(
      <div className="mt-4 p-2 flex flex-col items-center font-oswald">
          submitting....
      </div>
    )
  }
  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="mt-4 p-2 flex flex-col items-center font-oswald"
    >
      <textarea
        {...register("thought", {
          required: "Thought cannot be empty ",
          maxLength: { value: 100, message: "maximum length is 100" },
        })}
        className="w-[90%] md:w-[300px] h-40 md:h-[200px] border-4 border-yellow-400 p-3 md:p-4 rounded-xl text-black resize-none"
        placeholder="share your thought in maximum 100 words"
      ></textarea>
      {errors.thought && (
        <p className="text-red-500">{errors.thought.message}</p>
      )}

      <button
        type="submit"
        className="mt-5 mb-3 w-32 md:w-fit px-5 py-2 rounded-md border-2 border-black bg-orange-400 text-white text-sm md:text-base"
      >
        Post
      </button>
    </form>
  );
};

export default ThoughtForm;
