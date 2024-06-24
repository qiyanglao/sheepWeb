import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Flex, Tag, Tooltip } from "antd";

const App: React.FC = () => {
  const [tags, setTags] = useState<string[]>(["Unremovable"]);
  const [count, setCount] = useState(1);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const handleAdd = () => {
    setTags((s) => {
      return [...s, `Tag ${count}`];
    });
    setCount(count + 1);
  };

  return (
    <>
      <Flex gap="4px 0" wrap>
        {tags.map<React.ReactNode>((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              bordered={false}
              color="processing"
              closeIcon={<CloseOutlined style={{ color: "#3e8eff" }} />}
              key={tag}
              closable={index !== 0}
              style={{ userSelect: "none" }}
              onClose={() => handleClose(tag)}
            >
              <span>{isLongTag ? `${tag.slice(0, 20)}...` : tag}</span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      </Flex>
      <button onClick={handleAdd}>add</button>
    </>
  );
};

export default App;
