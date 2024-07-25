import { Board } from "@prisma/client";
import BoardTitle from "./board-title";
import BoardOptions from "./board-options";

interface BoardNavBarProps {
  board: Board;
}

export default function BoardNavBar({ board }: BoardNavBarProps) {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center text-white gap-x-4 px-6">
      <BoardTitle data={board}/>
      <div className="ml-auto">
        <BoardOptions id={board.id}/>
      </div>
    </div>
  );
}
