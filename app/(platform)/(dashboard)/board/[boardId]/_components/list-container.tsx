"use client";

import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import { useEffect, useState } from "react";
import ListItem from "./list-item";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/useAction";
import { updateListOrder } from "@/server/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/server/update-card-order";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function ListContainer({ data, boardId }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: (data) => toast.success("List reordered"),
    onError: (err) => toast.error(err),
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: (data) => toast.success("card reordered"),
    onError: (err) => toast.error(err),
  });

  function onDragEnd(result: any) {
    const { destination, source, type } = result;
    if (!destination) return;
    // same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    // list move
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, idx) => ({ ...item, order: idx })
      );
      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }

    // card move
    if (type === "card") {
      const copyData = [...orderedData];
      const sourceList = copyData.find(
        (list) => list.id === source.droppableId
      );
      const destList = copyData.find(
        (list) => list.id === destination.droppableId
      );
      if (!sourceList || !destList) return;
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      if (!destList.cards) {
        destList.cards = [];
      }
      // same list movement
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });
        sourceList.cards = reorderedCards;
        setOrderedData(copyData);
        executeUpdateCardOrder({ items: reorderedCards, boardId });
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        movedCard.listId = destination.droppableId;
        destList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, idx) => (card.order = idx));
        destList.cards.forEach((card, idx) => (card.order = idx));
        setOrderedData(copyData);
        executeUpdateCardOrder({ boardId, items: destList.cards });
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, idx) => {
              return <ListItem key={list.id} index={idx} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1 " />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
