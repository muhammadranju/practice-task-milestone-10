const TRSkeleton = () => {
  return (
    <tr className="border-b animate-pulse">
      <td className="p-3 bg-gray-200 rounded"></td>
      <td className="p-3 bg-gray-200 rounded"></td>
      <td className="p-3 bg-gray-200 rounded"></td>
      <td className="p-3 bg-gray-200 rounded"></td>
      <td className="p-3 bg-gray-200 rounded"></td>
      <td className="p-3 flex space-x-2">
        <div className="bg-gray-200 text-white p-2 rounded-md"></div>
        <div className="bg-gray-200 text-white p-2 rounded-md"></div>
      </td>
    </tr>
  );
};

export default TRSkeleton;
