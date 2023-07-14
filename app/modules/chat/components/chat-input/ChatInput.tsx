import { Button } from "~/modules/shared/button/Button"
import { Input } from "~/modules/shared/input/Input";
import styles from "./ChatInput.module.css";

export const ChatInput = () => {
  return (
    <div className={styles.ChatInput}>
      <Input type="text" />
      <Button>Send</Button>
    </div>
  );
}