import { Meta, Story } from "@storybook/react";

import Button, { LinkButtonProps } from "./linkButton";

const meta: Meta = {
  title: "Components/Elements/Button",
  component: Button,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<LinkButtonProps> = (props: LinkButtonProps) => (
  <Button {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary Button",
  variant: "primary",
};

export const Inverse = Template.bind({});
Inverse.args = {
  children: "Inverse Button",
  variant: "inverse",
};

export const Danger = Template.bind({});
Danger.args = {
  children: "Danger Button",
  variant: "danger",
};
