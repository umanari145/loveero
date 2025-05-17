import { Item } from "@/interface/Item";
import Header from "@/layout/header"
import { useEffect, useState } from "react";
import { useRouter } from "../../../node_modules/next/router";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Item>();
  //const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (id:string): Promise<void> => {
    try {
      //setLoading(true);
      // JSONPlaceholderのAPIからダミーデータを取得
      const response = await fetch(`/api/item/${id}`);
      if (!response.ok) {
        throw new Error(`APIエラー: ${response.status}`);
      }
      const result = await response.json();
      setData(result.item)
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof id === 'string') {
      fetchData(id);
    }
  }, [id]);

  return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div>
        <Header></Header>
        <div>
        <iframe
          width="98%"
          src={data?.videoUrl}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin"
          style={{
            display: 'block', // margin: auto; を効かせるために必要
            marginLeft: 'auto',
            marginRight: 'auto',
            border: 'none',
          }}
        >
        </iframe>
        </div>
        <h1 class="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
          {data?.title}
        </h1>

        <div className="flex items-center flex-wrap gap-2 px-4 py-2">
          {data?.tags.map((tag:string) => (
            <span className="bg-gray-200 text-gray-700 text-sm font-medium rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>

        <p class="text-[#141414] text-base font-normal leading-normal pb-3 pt-1 px-4">
          2.2k views
        </p>
        <div class="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
          <div class="flex items-center gap-4">
            <p class="text-[#141414] text-base font-normal leading-normal flex-1 truncate">サイト</p>
          </div>
          <div class="shrink-0">
            <button
              class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f2f2f2] text-[#141414] text-sm font-medium leading-normal w-fit"
            >
              <span class="truncate">Follow</span>
            </button>
          </div>
        </div>  

        <h3 class="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Comments (26)</h3>

        <div>
          <div class="flex items-center px-4 py-3 gap-3 @container">
            <label class="flex flex-col min-w-40 h-12 flex-1">
              <input
                placeholder="Add a comment..."
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border-none bg-[#f2f2f2] focus:border-none h-full placeholder:text-[#757575] px-4 text-base font-normal leading-normal"
                value=""
              />
            </label>
          </div>
          <div class="h-5 bg-white"></div>
        </div>

        <div class="flex w-full flex-row items-start justify-start gap-3 p-4">
          <div class="flex h-full flex-1 flex-col items-start justify-start">
            <div class="flex w-full flex-row items-start justify-start gap-x-3">
              <p class="text-[#141414] text-sm font-bold leading-normal tracking-[0.015em]">Joe Finn</p>
              <p class="text-[#757575] text-sm font-normal leading-normal">21min ago</p>
            </div>
            <p class="text-[#141414] text-sm font-normal leading-normal">I normally click like before watching. The show is always so good.</p>
            <div class="flex w-full flex-row items-center justify-start gap-9 pt-2">
              <div class="flex items-center gap-2">
                <div class="text-[#757575]" data-icon="ThumbsUp" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"
                    ></path>
                  </svg>
                </div>
                <p class="text-[#757575] text-sm font-normal leading-normal">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}