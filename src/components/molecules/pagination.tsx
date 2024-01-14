import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Code } from "../../../types";


interface Props {
  hasNextPage: boolean,
  hasPrevPage: boolean,
  snippets: Code[]
}

const PaginationControler = ({ hasNextPage, hasPrevPage, snippets }: Props) => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '15'
  const totalSnippets = snippets.length

  return (
    <div className="flex align-baseline justify-center gap-8">
      <button
        className="text-[#f94d1c]"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`)
        }}>
        <GrPrevious size="30" />
      </button>

      <p>{page} / {Math.ceil(totalSnippets/ Number(per_page))} </p>
      <button
      className="text-[#f94d1c] hover:cursor-pointer"
      disabled={!hasNextPage}
      onClick={() => {
        router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)
      }}>
        <GrNext size="30"/>
      </button>
    </div>
  )
}
export default PaginationControler