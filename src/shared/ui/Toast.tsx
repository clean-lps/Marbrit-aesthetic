import { Toaster as SonnerToaster } from "sonner";

type ToastProps = React.ComponentProps<typeof SonnerToaster>;

export function Toast({ ...props }: ToastProps) {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
      }}
      {...props}
    />
  );
}
