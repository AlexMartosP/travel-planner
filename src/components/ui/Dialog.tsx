import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import * as RadixDialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

export function Dialog({
  title,
  description,
  children,
  open,
  error,
  formId,
  buttonLabel,
  loading,
  onButtonClick,
  onClose,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  error?: {
    title?: string;
    description?: string;
  };
  loading: boolean;
  buttonLabel?: string;
  formId?: string;
  onButtonClick?: () => void;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <RadixDialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-slate-400 bg-opacity-25" />
        <RadixDialog.Content className="fixed bottom-0 left-0 sm:bottom-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2 bg-white rounded-md w-full sm:w-[500px] max-h-[90%] sm:max-h-[500px] overflow-auto">
          <div className="sticky top-0 left-0 right-0 px-4 py-2 bg-white rounded-t-md border-b z-10">
            <div className="flex justify-between items-center">
              <RadixDialog.Title className="font-medium">
                {title}
              </RadixDialog.Title>
              <RadixDialog.Close>
                <XIcon width={18} height={18} />
              </RadixDialog.Close>
            </div>
            <RadixDialog.Description className="text-sm text-slate-500">
              {description}
            </RadixDialog.Description>
          </div>
          <div className="my-4 px-4">{children}</div>
          {(buttonLabel || (error && error.title)) && (
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t z-10 rounded-b-md">
              <div className="px-4 py-2 grid gap-3">
                {error && error.title && (
                  <Alert title={error.title} variant="emergency">
                    {error.description}
                  </Alert>
                )}
                {buttonLabel && (
                  <div className="flex justify-end">
                    <Button
                      form={formId}
                      variant="success"
                      loading={loading}
                      onClick={() => onButtonClick?.()}
                    >
                      {buttonLabel}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
