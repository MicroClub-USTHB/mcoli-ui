import { McButton } from '../ui/mc-button';
import {
  McDialog,
  McDialogClose,
  McDialogContent,
  McDialogDescription,
  McDialogFooter,
  McDialogHeader,
  McDialogTitle,
  McDialogTrigger,
} from '@/registry/ui/mc-dialog';

export default function McDialogDemo() {
  return (
    <div className="py-6">
      <McDialog>
        <McDialogTrigger
          render={
            <McButton variant="primary" size="md">
              Open dialog
            </McButton>
          }
        />
        <McDialogContent className="gap-6">
          <McDialogHeader className="gap-2.5">
            <McDialogTitle>Edit profile</McDialogTitle>
            <McDialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </McDialogDescription>
          </McDialogHeader>

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

          <McDialogFooter showCloseButton={false}>
            <McDialogClose
              render={
                <McButton variant="secondary" size="md">
                  Cancel
                </McButton>
              }
            />
            <McDialogClose
              render={
                <McButton variant="primary" size="md">
                  Save changes
                </McButton>
              }
            />
          </McDialogFooter>
        </McDialogContent>
      </McDialog>
    </div>
  );
}
