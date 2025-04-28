import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-xl shadow-lg bg-white border border-gray-200 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-xl text-gray-800">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
        <span className="text-sm text-gray-400">{job?.datePosted}</span>
      </div>
      <div className="my-4">
        <h1 className="font-bold text-2xl text-gray-900">{job?.title}</h1>
        <p className="text-sm text-gray-700 mt-2">{job?.description}</p>
      </div>
      <div className="flex flex-wrap gap-3 mt-4">
        <Badge
          className="text-white bg-blue-600 font-bold py-1 px-3 rounded-lg"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="text-white bg-[#F83002] font-bold py-1 px-3 rounded-lg"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-white bg-[#7209b7] font-bold py-1 px-3 rounded-lg"
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
