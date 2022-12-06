import { forwardRef } from 'react';
import { Group, Avatar, Text, Select } from '@mantine/core';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export default function ModelSelection(props:any) {
    function setModel(value:any) {
        props.handleModelChanged(value);
    }
  return (
    <Select
      label="Pick Your Model"
      placeholder="Pick one"
      itemComponent={SelectItem}
      data={props.data}
      onChange={setModel}
      value={props.model}
      searchable
      maxDropdownHeight={400}
      nothingFound="Nobody here"
      filter={(value, item) =>
        item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}
