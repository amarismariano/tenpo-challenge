import React from "react";

const EmptyState: React.FC = () => {
  return (
    <div className="col-span-full flex items-center justify-center p-8 text-center">
      <div className="rounded-lg bg-yellow-50 p-6">
        <p className="text-lg font-medium text-yellow-800">
          No characters found
        </p>
        <p className="mt-2 text-sm text-yellow-700">
          Try adjusting your search or filter criteria
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
