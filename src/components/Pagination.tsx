import React from "react";

interface Props {
  filteredLength: number;
  perPage: number;
  page: number;
  setPage: (p: number) => void;
}

const Pagination: React.FC<Props> = ({ filteredLength, perPage, page, setPage }) => {
  if (filteredLength <= perPage) return null;
  return (
    <div className="flex justify-center items-center gap-1 py-4 flex-wrap bg-white rounded-b-2xl">
      <button
        className={`px-3 py-1 rounded-lg border text-[15px] ${
          page === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-blue-50 text-gray-700'
        }`}
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        &lt;
      </button>
      {Array.from(
        { length: Math.ceil(filteredLength / perPage) },
        (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-lg border font-semibold text-[15px] ${
              page === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-white hover:bg-blue-50 text-gray-700'
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        )
      )}
      <button
        className={`px-3 py-1 rounded-lg border text-[15px] ${
          page === Math.ceil(filteredLength / perPage)
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-blue-50 text-gray-700'
        }`}
        onClick={() =>
          setPage(Math.min(Math.ceil(filteredLength / perPage), page + 1))
        }
        disabled={page === Math.ceil(filteredLength / perPage)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
