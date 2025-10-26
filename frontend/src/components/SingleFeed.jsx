import React from "react";
import ThoughtCard from "./ThoughtCard";
import Like from "./Like";
import Follow from "./Follow";

const SingleFeed = ({ postid, post , author, content }) => {
  return (
    <div className="px-2 md:px-5 mt-2 mb-2 font-oswald">
      <div className="flex flex-col border-2 border-orange-300 mx-auto bg-white p-2 md:p-4 md:w-[500px] w-fit rounded-md">
        {/* Header */}
        <div className="ml-0 flex flex-row items-center gap-2">
          <div className="img">
            <img src={author.avatarurl} className="w-6 md:w-8 rounded-full" />
          </div>
          <div>
            <p className="text-sm md:text-xl font-bold text-zinc-500">
              {author.name}
            </p>
          </div>
          <Follow authorid={author._id} />
          <div className="text-sm md:text-xs ml-auto text-zinc-600">
            <i>
              {new Date(post.createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              })}
            </i>
          </div>
        </div>

        {/* Thought Card */}
        <div className="mt-2 mb-3 mx-auto w-full md:w-auto">
          <ThoughtCard content={content} id={postid} />
          
        </div>
      </div>
    </div>
  );
};

export default SingleFeed;
