import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

interface DeleteDialogProps {
  onDelete: () => void;
  onHide: () => void;
  visible: boolean,
  description?: string
  header: string
}

export const DeleteDialog = ({
  onDelete,
  onHide,
  visible,
  description,
  header,
}: DeleteDialogProps) => {
  
  return (
    <>
        <Dialog visible={visible} header={header} modal onHide={onHide}>
            {description && <p>{description}</p>}
            <div className="flex justify-end mt-3">
            <Button label="Não" className="p-button-text" onClick={onHide} />
            <Button label="Sim" className="p-button-danger" onClick={onDelete} />
            </div>
        </Dialog>
    </>
  );
};
