import { Button } from "~/modules/shared/button/Button"
import { Input } from "~/modules/shared/input/Input";

export const ChatInput = () => {
  return (
    <div>
      <Input type="text" />
      <Button>Send</Button>
    </div>
  );
}