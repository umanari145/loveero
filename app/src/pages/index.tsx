import { ApiResponse } from "@/interface/ApiResponse";
import Header from "@/layout/header"
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { Item } from "../interface/Item";

// APIからデータを取得するカスタムフック
function useApiData(): ApiResponse {
  const [data, setData] = useState<[]>([]);
  //const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        //setLoading(true);
        // JSONPlaceholderのAPIからダミーデータを取得
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error(`APIエラー: ${response.status}`);
        }

        const result = await response.json();
        setData(result.items)
      } catch (err) {
        setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
      } finally {
        //setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error };
}

function ItemComponent({item}: Item): JSX.Element {
  return (
      <li key={item._id} className="bg-white rounded-lg overflow-hidden">
        <div className="flex w-95 m-auto">
          <div className="w-40 h-24 md:w-48 md:h-27 lg:w-64 lg:h-36 shrink-0">
            <a href={`/movies/${item._id}`}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          <div className="flex-1 px-2">
            <a href={`/movies/${item._id}`}>
              <h2 className="text-lg font-semibold mb-2 text-[#141414]">{item.title}</h2>
            </a>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag:string) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-700 text-sm font-medium rounded-full px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </li>
  )
}

export default function Home():JSX.Element {
  const { data,  error} = useApiData();

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <Header></Header>
      <div className="px-4">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div
              className="text-[#757575] flex border-none bg-[#f2f2f2] items-center justify-center pl-4 rounded-l-xl border-r-0"
              data-icon="MagnifyingGlass"
              data-size="24px"
              data-weight="regular"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              placeholder="Search for moviess"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border-none bg-[#f2f2f2] focus:border-none h-full placeholder:text-[#757575] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value=""
            />
          </div>
        </label>
      </div>

      <h3 className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">タグ</h3>

      <div className="flex gap-3 p-3 flex-wrap pr-4">
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f2f2f2] pl-4 pr-4">
          <p className="text-[#141414] text-sm font-medium leading-normal">女子高生</p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f2f2f2] pl-4 pr-4">
          <p className="text-[#141414] text-sm font-medium leading-normal">人妻</p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f2f2f2] pl-4 pr-4">
          <p className="text-[#141414] text-sm font-medium leading-normal">巨乳</p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f2f2f2] pl-4 pr-4">
          <p className="text-[#141414] text-sm font-medium leading-normal">中出し</p>
        </div>
      </div>

      <h2 className="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">動画リスト</h2>
      <ul className="grid grid-cols-1 gap-6">
        {data.map((item:Item) => (
          <ItemComponent key={item._id} item={item} />
        ))}
      </ul>


    </div>
  );
}
