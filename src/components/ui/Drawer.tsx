import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

export function Drawer({
  title,
  description,
  children,
  open,
  error,
  formId,
  buttonLabel,
  loading,
  onClose,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  error?: {
    title: string;
    description?: string;
  };
  loading: boolean;
  buttonLabel: string;
  formId?: string;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-400 bg-opacity-15" />
        <Dialog.Content className="fixed top-0 right-0 bg-white rounded-se-md  w-[500px] overflow-auto h-full ">
          <div className="sticky top-0 left-0 right-0 px-4 py-2 bg-white rounded-ss-md border-b z-10">
            <div className="flex justify-between items-center">
              <Dialog.Title className="font-medium">{title}</Dialog.Title>
              <Dialog.Close>
                <XIcon width={18} height={18} />
              </Dialog.Close>
            </div>
            <Dialog.Description className="text-sm text-slate-500">
              {description}
            </Dialog.Description>
          </div>
          <div className="my-4 px-4">{children}</div>
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t z-10">
            <div className="px-4 py-2 grid gap-3">
              {error && error.title && (
                <Alert title={error.title} variant="emergency">
                  {error.description}
                </Alert>
              )}
              <div className="flex justify-end">
                <Button form={formId} variant="success" loading={loading}>
                  {buttonLabel}
                </Button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
