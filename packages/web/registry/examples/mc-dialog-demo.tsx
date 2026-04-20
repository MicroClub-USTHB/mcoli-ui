import { McButton } from '../ui/mc-button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/mc-dialog';

export default function McDialogDemo() {
  return (
    <div className="flex min-h-72 items-center justify-center py-6">
      <Dialog>
        <DialogTrigger
          render={
            <McButton variant="primary" size="md">
              Open dialog
            </McButton>
          }
        />
        <DialogContent className="gap-6">
          <DialogHeader className="gap-2.5">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-2.5">
              <label
                htmlFor="name"
                className="font-sans text-sm leading-5 font-medium tracking-normal text-muted-foreground"
              >
                Name
              </label>
              <input
                id="name"
                defaultValue="Pedro Duarte"
                className="h-9 w-[375px] max-w-full rounded-md border border-blue-primary-200 bg-transparent px-3 py-1 font-sans text-sm leading-5 font-normal tracking-normal text-foreground opacity-100 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="grid gap-2.5">
              <label
                htmlFor="username"
                className="font-sans text-sm leading-5 font-medium tracking-normal text-muted-foreground"
              >
                Username
              </label>
              <input
                id="username"
                defaultValue="@peduarte"
                className="h-9 w-[375px] max-w-full rounded-md border border-blue-primary-200 bg-transparent px-3 py-1 font-sans text-sm leading-5 font-normal tracking-normal text-foreground opacity-100 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>
          </form>

          <DialogFooter showCloseButton={false}>
            <DialogClose
              render={
                <McButton variant="secondary" size="md">
                  Cancel
                </McButton>
              }
            />
            <DialogClose
              render={
                <McButton variant="primary" size="md">
                  Save changes
                </McButton>
              }
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
